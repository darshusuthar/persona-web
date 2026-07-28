'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowser } from '@/lib/supabase/browserClient';
import type { Collection, Field } from '@/lib/admin/collections';

type Values = Record<string, unknown>;

function toLocalInput(v: unknown): string {
  if (!v) return '';
  const d = new Date(v as string);
  if (isNaN(d.getTime())) return '';
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 16);
}

export default function RecordForm({
  collection,
  record,
  isNew,
}: {
  collection: Collection;
  record: Values;
  isNew: boolean;
}) {
  const router = useRouter();
  const supabase = createSupabaseBrowser();
  const [values, setValues] = useState<Values>({ ...record });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  function set(name: string, v: unknown) {
    setValues((prev) => ({ ...prev, [name]: v }));
  }

  async function uploadImage(field: string, file: File) {
    setBusy(true);
    setErr('');
    const path = `${collection.key}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const { error } = await supabase.storage.from('media').upload(path, file, { upsert: true });
    if (error) {
      setErr(error.message);
      setBusy(false);
      return;
    }
    const { data } = supabase.storage.from('media').getPublicUrl(path);
    set(field, data.publicUrl);
    setBusy(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr('');

    // build a clean payload from the collection's fields
    const payload: Values = {};
    for (const f of collection.fields) {
      let v = values[f.name];
      if (f.type === 'number') v = v === '' || v == null ? null : Number(v);
      if (f.type === 'datetime') v = v ? new Date(v as string).toISOString() : null;
      if (v === '') v = null;
      payload[f.name] = v ?? null;
    }

    let error;
    if (isNew) {
      ({ error } = await supabase.from(collection.table).insert(payload));
    } else {
      ({ error } = await supabase
        .from(collection.table)
        .update(payload)
        .eq(collection.pk, record[collection.pk] as string));
    }

    if (error) {
      setErr(error.message);
      setBusy(false);
      return;
    }

    await fetch('/api/revalidate', { method: 'POST' });
    router.push(`/admin/${collection.key}`);
    router.refresh();
  }

  const main = collection.fields.filter((f) => f.group !== 'seo');
  const seo = collection.fields.filter((f) => f.group === 'seo');

  return (
    <form className="adm-form" onSubmit={onSubmit}>
      <div className="adm-panel adm-form-panel">
        <p className="adm-panel-title">Content</p>
        {main.map((f) => (
          <FieldInput key={f.name} field={f} value={values[f.name]} set={set} upload={uploadImage} />
        ))}
      </div>

      {seo.length > 0 && (
        <div className="adm-panel adm-form-panel">
          <p className="adm-panel-title">SEO &amp; sharing</p>
          {seo.map((f) => (
            <FieldInput key={f.name} field={f} value={values[f.name]} set={set} upload={uploadImage} />
          ))}
        </div>
      )}

      {err ? <p className="adm-err">{err}</p> : null}

      <div className="adm-formactions">
        <button type="submit" disabled={busy}>
          {busy ? 'Saving…' : 'Save changes'}
        </button>
        <button type="button" className="adm-cancel" onClick={() => router.push(`/admin/${collection.key}`)}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function FieldInput({
  field,
  value,
  set,
  upload,
}: {
  field: Field;
  value: unknown;
  set: (n: string, v: unknown) => void;
  upload: (n: string, f: File) => void;
}) {
  const v = value ?? '';
  return (
    <label className="adm-field">
      <span>{field.label}</span>

      {field.type === 'textarea' && (
        <textarea rows={4} value={v as string} onChange={(e) => set(field.name, e.target.value)} />
      )}

      {field.type === 'markdown' && (
        <textarea
          rows={12}
          className="adm-mono"
          value={v as string}
          onChange={(e) => set(field.name, e.target.value)}
        />
      )}

      {field.type === 'select' && (
        <select value={v as string} onChange={(e) => set(field.name, e.target.value)}>
          {(field.options ?? []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}

      {field.type === 'number' && (
        <input type="number" value={v as number} onChange={(e) => set(field.name, e.target.value)} />
      )}

      {field.type === 'datetime' && (
        <input
          type="datetime-local"
          value={toLocalInput(v)}
          onChange={(e) => set(field.name, e.target.value)}
        />
      )}

      {field.type === 'image' && (
        <div className="adm-image">
          {v ? <img src={v as string} alt="" /> : null}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) upload(field.name, file);
            }}
          />
          <input
            type="text"
            placeholder="or paste an image URL"
            value={v as string}
            onChange={(e) => set(field.name, e.target.value)}
          />
        </div>
      )}

      {(field.type === 'text' || field.type === 'url') && (
        <input type="text" value={v as string} onChange={(e) => set(field.name, e.target.value)} />
      )}
    </label>
  );
}
