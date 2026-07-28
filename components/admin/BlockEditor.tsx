'use client';
import { useRef, useState } from 'react';
import { createSupabaseBrowser } from '@/lib/supabase/browserClient';

export type Block =
  | { id: string; type: 'text'; markdown: string }
  | { id: string; type: 'image'; url: string; caption: string }
  | { id: string; type: 'video'; url: string }
  | { id: string; type: 'embed'; url: string; html: string };

type Props = {
  value: Block[];
  onChange: (blocks: Block[]) => void;
};

const uid = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `b_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

function makeBlock(type: Block['type']): Block {
  const id = uid();
  if (type === 'text') return { id, type, markdown: '' };
  if (type === 'image') return { id, type, url: '', caption: '' };
  if (type === 'video') return { id, type, url: '' };
  return { id, type: 'embed', url: '', html: '' };
}

const TYPE_LABEL: Record<Block['type'], string> = {
  text: 'Text',
  image: 'Image',
  video: 'Video',
  embed: 'Embed / widget',
};

export default function BlockEditor({ value, onChange }: Props) {
  const supabase = createSupabaseBrowser();
  const blocks = Array.isArray(value) ? value : [];
  const [busyId, setBusyId] = useState<string | null>(null);
  const [err, setErr] = useState('');
  const dragFrom = useRef<number | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  const many = blocks.length > 1;

  function add(type: Block['type']) {
    onChange([...blocks, makeBlock(type)]);
  }
  function update(id: string, patch: Partial<Block>) {
    onChange(blocks.map((b) => (b.id === id ? ({ ...b, ...patch } as Block) : b)));
  }
  function remove(id: string) {
    onChange(blocks.filter((b) => b.id !== id));
  }
  function reorder(from: number, to: number) {
    if (from == null || to == null || from === to || to < 0 || to >= blocks.length) return;
    const next = [...blocks];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  }

  async function uploadImage(id: string, file: File) {
    setBusyId(id);
    setErr('');
    // All block media lives in one shared "uploads" folder.
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `uploads/${Date.now()}-${safe}`;
    const { error } = await supabase.storage.from('media').upload(path, file, { upsert: true });
    if (error) {
      setErr(error.message);
      setBusyId(null);
      return;
    }
    const { data } = supabase.storage.from('media').getPublicUrl(path);
    update(id, { url: data.publicUrl });
    setBusyId(null);
  }

  return (
    <div className="be">
      {blocks.length === 0 && <p className="be-empty">No sections yet. Add your first one below.</p>}

      {blocks.map((b, i) => (
        <div
          className={`be-block${draggingId === b.id ? ' dragging' : ''}`}
          key={b.id}
          data-over={overIdx === i && draggingId !== b.id ? 'true' : undefined}
          onDragOver={(e) => {
            if (dragFrom.current == null) return;
            e.preventDefault();
            if (overIdx !== i) setOverIdx(i);
          }}
          onDrop={(e) => {
            e.preventDefault();
            if (dragFrom.current != null) reorder(dragFrom.current, i);
            dragFrom.current = null;
            setDraggingId(null);
            setOverIdx(null);
          }}
        >
          <div className="be-block-head">
            <div className="be-head-left">
              {many && (
                <span
                  className="be-drag"
                  title="Drag to reorder"
                  draggable
                  onDragStart={(e) => {
                    dragFrom.current = i;
                    setDraggingId(b.id);
                    e.dataTransfer.effectAllowed = 'move';
                  }}
                  onDragEnd={() => {
                    dragFrom.current = null;
                    setDraggingId(null);
                    setOverIdx(null);
                  }}
                >
                  ⠿
                </span>
              )}
              <span className="be-type">{TYPE_LABEL[b.type]}</span>
            </div>
            <div className="be-block-tools">
              {many && (
                <>
                  <button type="button" onClick={() => reorder(i, i - 1)} disabled={i === 0} aria-label="Move up">
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => reorder(i, i + 1)}
                    disabled={i === blocks.length - 1}
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                </>
              )}
              <button type="button" className="be-del" onClick={() => remove(b.id)} aria-label="Delete">
                ✕
              </button>
            </div>
          </div>

          {b.type === 'text' && (
            <textarea
              className="adm-mono"
              rows={6}
              placeholder="Markdown text…"
              value={b.markdown}
              onChange={(e) => update(b.id, { markdown: e.target.value })}
            />
          )}

          {b.type === 'image' && (
            <div className="be-fields">
              {b.url ? <img className="be-preview" src={b.url} alt="" /> : null}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadImage(b.id, f);
                }}
              />
              <input
                type="text"
                placeholder="or paste an image URL"
                value={b.url}
                onChange={(e) => update(b.id, { url: e.target.value })}
              />
              <input
                type="text"
                placeholder="Caption / credit (shown under the image)"
                value={b.caption}
                onChange={(e) => update(b.id, { caption: e.target.value })}
              />
              {busyId === b.id && <span className="be-hint">Uploading…</span>}
            </div>
          )}

          {b.type === 'video' && (
            <div className="be-fields">
              <input
                type="text"
                placeholder="YouTube, Vimeo or Loom link"
                value={b.url}
                onChange={(e) => update(b.id, { url: e.target.value })}
              />
              <span className="be-hint">Paste the normal share link; it becomes a responsive player.</span>
            </div>
          )}

          {b.type === 'embed' && (
            <div className="be-fields">
              <input
                type="text"
                placeholder="Share link (Figma, Spotify, CodePen, map…)"
                value={b.url}
                onChange={(e) => update(b.id, { url: e.target.value })}
              />
              <textarea
                className="adm-mono"
                rows={3}
                placeholder="…or paste a full <iframe> embed here (takes priority)"
                value={b.html}
                onChange={(e) => update(b.id, { html: e.target.value })}
              />
            </div>
          )}
        </div>
      ))}

      {err ? <p className="adm-err">{err}</p> : null}

      <div className="be-add">
        <span>Add section:</span>
        <button type="button" onClick={() => add('text')}>
          + Text
        </button>
        <button type="button" onClick={() => add('image')}>
          + Image
        </button>
        <button type="button" onClick={() => add('video')}>
          + Video
        </button>
        <button type="button" onClick={() => add('embed')}>
          + Embed
        </button>
      </div>
    </div>
  );
}
