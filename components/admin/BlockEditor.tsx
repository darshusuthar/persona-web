'use client';
import { useRef, useState } from 'react';
import { createSupabaseBrowser } from '@/lib/supabase/browserClient';
import {
  BASIC_BLOCKS,
  type Block,
  type BlockType,
  type CardItem,
  type DecisionBlock,
  type GalleryBlock,
  type GalleryItem,
  type StatItem,
  type TextBlock,
} from '@/lib/blocks';

export type { Block } from '@/lib/blocks';

type Props = {
  value: Block[];
  onChange: (blocks: Block[]) => void;
  types?: BlockType[]; // which blocks can be added; defaults to the basic four
};

const uid = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `b_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

function makeBlock(type: BlockType): Block {
  const id = uid();
  switch (type) {
    case 'text':
      return { id, type, markdown: '' };
    case 'image':
      return { id, type, url: '', caption: '' };
    case 'video':
      return { id, type, url: '' };
    case 'embed':
      return { id, type, url: '', html: '' };
    case 'gallery':
      return { id, type, layout: 'tray', columns: 3, items: [] };
    case 'stats':
      return { id, type, items: [{ value: '', label: '', bad: false }], source: '' };
    case 'quote':
      return { id, type, text: '', note: '' };
    case 'cards':
      return { id, type, items: [{ title: '', body: '' }] };
    case 'decision':
      return {
        id,
        type,
        kicker: '',
        title: '',
        aLabel: '',
        aBody: '',
        bLabel: '',
        bBody: '',
        call: '',
        markdown: '',
        columns: 1,
        items: [],
      };
    case 'insight':
      return { id, type, label: '', heard: '', quote: '', changed: '' };
  }
}

const TYPE_LABEL: Record<BlockType, string> = {
  text: 'Text',
  image: 'Image',
  video: 'Video',
  embed: 'Embed / widget',
  gallery: 'Screens',
  stats: 'Stats',
  quote: 'Quote',
  cards: 'Cards',
  decision: 'Decision',
  insight: 'User research',
};

// Short summary shown on collapsed blocks so a long case study stays scannable.
function summary(b: Block): string {
  const first = (s: string) => (s || '').split('\n').find((l) => l.trim())?.replace(/^#+\s*/, '') || '';
  switch (b.type) {
    case 'text':
      return [b.tag, first(b.markdown)].filter(Boolean).join(' · ');
    case 'image':
      return b.caption || b.url.split('/').pop() || '';
    case 'gallery':
      return `${b.items.length} screen${b.items.length === 1 ? '' : 's'} · ${b.layout}${b.layout === 'banner' ? '' : ` · ${b.columns} per row`}`;
    case 'stats':
      return b.items.map((s) => s.value).join(' · ');
    case 'quote':
      return b.text;
    case 'cards':
      return b.items.map((c) => c.title).join(' · ');
    case 'decision':
      return [b.kicker, b.title].filter(Boolean).join(' · ');
    case 'insight':
      return [b.label, b.heard].filter(Boolean).join(' · ');
    default:
      return (b as { url?: string }).url || '';
  }
}

// Move item i of a list up/down.
function move<T>(list: T[], i: number, d: number): T[] {
  const j = i + d;
  if (j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

export default function BlockEditor({ value, onChange, types = BASIC_BLOCKS }: Props) {
  const supabase = createSupabaseBrowser();
  const blocks = Array.isArray(value) ? value : [];
  const [busyId, setBusyId] = useState<string | null>(null);
  const [err, setErr] = useState('');
  const dragFrom = useRef<number | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  // Long block lists start collapsed; open the ones being edited.
  const [open, setOpen] = useState<Set<string>>(() => (blocks.length > 8 ? new Set() : new Set(blocks.map((b) => b.id))));

  const many = blocks.length > 1;
  const rich = types.length > BASIC_BLOCKS.length;

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function add(type: BlockType) {
    const b = makeBlock(type);
    onChange([...blocks, b]);
    setOpen((prev) => new Set(prev).add(b.id));
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

  async function uploadFile(file: File): Promise<string | null> {
    // All block media lives in one shared "uploads" folder.
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `uploads/${Date.now()}-${safe}`;
    const { error } = await supabase.storage.from('media').upload(path, file, { upsert: true });
    if (error) {
      setErr(error.message);
      return null;
    }
    return supabase.storage.from('media').getPublicUrl(path).data.publicUrl;
  }

  async function uploadImage(id: string, file: File) {
    setBusyId(id);
    setErr('');
    const url = await uploadFile(file);
    if (url) update(id, { url });
    setBusyId(null);
  }

  // Add several screens at once to a gallery/decision block.
  async function uploadMany(b: GalleryBlock | DecisionBlock, files: FileList) {
    setBusyId(b.id);
    setErr('');
    const added: GalleryItem[] = [];
    for (const f of Array.from(files)) {
      const url = await uploadFile(f);
      if (url) added.push({ url, caption: '' });
    }
    update(b.id, { items: [...b.items, ...added] });
    setBusyId(null);
  }

  return (
    <div className="be">
      {blocks.length === 0 && <p className="be-empty">No sections yet. Add your first one below.</p>}
      {blocks.length > 8 && (
        <div className="be-bulk">
          <button type="button" onClick={() => setOpen(new Set(blocks.map((b) => b.id)))}>
            Expand all
          </button>
          <button type="button" onClick={() => setOpen(new Set())}>
            Collapse all
          </button>
        </div>
      )}

      {blocks.map((b, i) => {
        const isOpen = open.has(b.id);
        return (
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
                <button type="button" className="be-toggle" onClick={() => toggle(b.id)} aria-expanded={isOpen}>
                  <span className="be-type">{TYPE_LABEL[b.type] ?? b.type}</span>
                  {!isOpen && <span className="be-sum">{summary(b)}</span>}
                </button>
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

            {isOpen && b.type === 'text' && <TextFields b={b} rich={rich} update={update} />}

            {isOpen && b.type === 'image' && (
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
                {rich && (
                  <label className="be-inline">
                    Style
                    <select value={b.style || ''} onChange={(e) => update(b.id, { style: e.target.value as '' | 'board' | 'xboard' })}>
                      <option value="">In the text column</option>
                      <option value="board">Wide board (dark frame)</option>
                      <option value="xboard">Extra-wide board (tray width)</option>
                    </select>
                  </label>
                )}
                {busyId === b.id && <span className="be-hint">Uploading…</span>}
              </div>
            )}

            {isOpen && b.type === 'video' && (
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

            {isOpen && b.type === 'embed' && (
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

            {isOpen && b.type === 'gallery' && (
              <div className="be-fields">
                <div className="be-row">
                  <label className="be-inline">
                    Layout
                    <select
                      value={b.layout}
                      onChange={(e) => update(b.id, { layout: e.target.value as GalleryBlock['layout'] })}
                    >
                      <option value="tray">Wide grey tray</option>
                      <option value="plain">Inside the text column</option>
                      <option value="banner">Hero banner (top of page)</option>
                    </select>
                  </label>
                  {b.layout !== 'banner' && (
                    <label className="be-inline">
                      Per row
                      <select value={b.columns} onChange={(e) => update(b.id, { columns: Number(e.target.value) })}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                </div>
                <ItemsEditor
                  items={b.items}
                  onChange={(items) => update(b.id, { items })}
                  onUpload={(files) => uploadMany(b, files)}
                  busy={busyId === b.id}
                />
              </div>
            )}

            {isOpen && b.type === 'stats' && (
              <div className="be-fields">
                {b.items.map((s, si) => (
                  <div className="be-item" key={si}>
                    <input
                      type="text"
                      className="be-narrow"
                      placeholder="54%"
                      value={s.value}
                      onChange={(e) => update(b.id, { items: setAt(b.items, si, { value: e.target.value }) })}
                    />
                    <input
                      type="text"
                      placeholder="What the number means"
                      value={s.label}
                      onChange={(e) => update(b.id, { items: setAt(b.items, si, { label: e.target.value }) })}
                    />
                    <label className="be-check" title="Show the number in red">
                      <input
                        type="checkbox"
                        checked={s.bad}
                        onChange={(e) => update(b.id, { items: setAt(b.items, si, { bad: e.target.checked }) })}
                      />
                      Red
                    </label>
                    <ItemTools list={b.items} i={si} onChange={(items) => update(b.id, { items })} />
                  </div>
                ))}
                <button
                  type="button"
                  className="be-addline"
                  onClick={() => update(b.id, { items: [...b.items, { value: '', label: '', bad: false } as StatItem] })}
                >
                  + Stat
                </button>
                <input
                  type="text"
                  placeholder="Source note (small text under the stats)"
                  value={b.source}
                  onChange={(e) => update(b.id, { source: e.target.value })}
                />
              </div>
            )}

            {isOpen && b.type === 'quote' && (
              <div className="be-fields">
                <textarea
                  rows={2}
                  placeholder="“The quote, including quote marks”"
                  value={b.text}
                  onChange={(e) => update(b.id, { text: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Small line under the quote"
                  value={b.note}
                  onChange={(e) => update(b.id, { note: e.target.value })}
                />
              </div>
            )}

            {isOpen && b.type === 'cards' && (
              <div className="be-fields">
                {b.items.map((c, ci) => (
                  <div className="be-item" key={ci}>
                    <input
                      type="text"
                      className="be-half"
                      placeholder="Title (e.g. Wave 1 · Early Sep)"
                      value={c.title}
                      onChange={(e) => update(b.id, { items: setAt(b.items, ci, { title: e.target.value }) })}
                    />
                    <input
                      type="text"
                      placeholder="Text"
                      value={c.body}
                      onChange={(e) => update(b.id, { items: setAt(b.items, ci, { body: e.target.value }) })}
                    />
                    <ItemTools list={b.items} i={ci} onChange={(items) => update(b.id, { items })} />
                  </div>
                ))}
                <button
                  type="button"
                  className="be-addline"
                  onClick={() => update(b.id, { items: [...b.items, { title: '', body: '' } as CardItem] })}
                >
                  + Card
                </button>
              </div>
            )}

            {isOpen && b.type === 'insight' && (
              <div className="be-fields">
                <input
                  type="text"
                  placeholder="Label (e.g. Wave 1 · Reward picker)"
                  value={b.label}
                  onChange={(e) => update(b.id, { label: e.target.value })}
                />
                <textarea
                  rows={3}
                  placeholder="What users told us (**bold** allowed)"
                  value={b.heard}
                  onChange={(e) => update(b.id, { heard: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Optional: a line in users' own words"
                  value={b.quote}
                  onChange={(e) => update(b.id, { quote: e.target.value })}
                />
                <textarea
                  rows={2}
                  placeholder="What it changed in the design"
                  value={b.changed}
                  onChange={(e) => update(b.id, { changed: e.target.value })}
                />
              </div>
            )}

            {isOpen && b.type === 'decision' && (
              <div className="be-fields">
                <input
                  type="text"
                  placeholder="Kicker (small caps label, e.g. Cadence)"
                  value={b.kicker}
                  onChange={(e) => update(b.id, { kicker: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Heading"
                  value={b.title}
                  onChange={(e) => update(b.id, { title: e.target.value })}
                />
                <div className="be-duo">
                  <div>
                    <input
                      type="text"
                      placeholder="Left label (e.g. Option A)"
                      value={b.aLabel}
                      onChange={(e) => update(b.id, { aLabel: e.target.value })}
                    />
                    <textarea
                      rows={3}
                      placeholder="Left text"
                      value={b.aBody}
                      onChange={(e) => update(b.id, { aBody: e.target.value })}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Right label (e.g. Option B)"
                      value={b.bLabel}
                      onChange={(e) => update(b.id, { bLabel: e.target.value })}
                    />
                    <textarea
                      rows={3}
                      placeholder="Right text"
                      value={b.bBody}
                      onChange={(e) => update(b.id, { bBody: e.target.value })}
                    />
                  </div>
                </div>
                <textarea
                  rows={2}
                  placeholder="The call (dark box). **Bold** text shows in gold."
                  value={b.call}
                  onChange={(e) => update(b.id, { call: e.target.value })}
                />
                <textarea
                  className="adm-mono"
                  rows={4}
                  placeholder="Body (markdown)"
                  value={b.markdown}
                  onChange={(e) => update(b.id, { markdown: e.target.value })}
                />
                <label className="be-inline">
                  Screens per row
                  <select value={b.columns} onChange={(e) => update(b.id, { columns: Number(e.target.value) })}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n === 1 ? '1 (single phone)' : `${n} (wide tray)`}
                      </option>
                    ))}
                  </select>
                </label>
                <ItemsEditor
                  items={b.items}
                  onChange={(items) => update(b.id, { items })}
                  onUpload={(files) => uploadMany(b, files)}
                  busy={busyId === b.id}
                />
              </div>
            )}
          </div>
        );
      })}

      {err ? <p className="adm-err">{err}</p> : null}

      <div className="be-add">
        <span>Add section:</span>
        {types.map((t) => (
          <button type="button" key={t} onClick={() => add(t)}>
            + {TYPE_LABEL[t]}
          </button>
        ))}
      </div>
    </div>
  );
}

function setAt<T>(list: T[], i: number, patch: Partial<T>): T[] {
  return list.map((x, j) => (j === i ? { ...x, ...patch } : x));
}

function ItemTools<T>({ list, i, onChange }: { list: T[]; i: number; onChange: (l: T[]) => void }) {
  return (
    <span className="be-itemtools">
      <button type="button" onClick={() => onChange(move(list, i, -1))} disabled={i === 0} aria-label="Move up">
        ↑
      </button>
      <button
        type="button"
        onClick={() => onChange(move(list, i, 1))}
        disabled={i === list.length - 1}
        aria-label="Move down"
      >
        ↓
      </button>
      <button
        type="button"
        className="be-del"
        onClick={() => onChange(list.filter((_, j) => j !== i))}
        aria-label="Remove"
      >
        ✕
      </button>
    </span>
  );
}

function TextFields({
  b,
  rich,
  update,
}: {
  b: TextBlock;
  rich: boolean;
  update: (id: string, patch: Partial<Block>) => void;
}) {
  return (
    <div className="be-fields">
      <textarea
        className="adm-mono"
        rows={6}
        placeholder="Markdown text… (## heading, ### subheading, - list, | tables |)"
        value={b.markdown}
        onChange={(e) => update(b.id, { markdown: e.target.value })}
      />
      {rich && (
        <>
          <div className="be-row">
            <input
              type="text"
              placeholder="Tag pill above (optional), e.g. Wave 1 · Dropped"
              value={b.tag || ''}
              onChange={(e) => update(b.id, { tag: e.target.value })}
            />
            <select value={b.tone || ''} onChange={(e) => update(b.id, { tone: e.target.value as TextBlock['tone'] })}>
              <option value="">Grey tag</option>
              <option value="dropped">Red tag (dropped)</option>
              <option value="partly">Gold tag (partly kept)</option>
              <option value="kept">Green tag (kept)</option>
            </select>
            <select value={b.style || ''} onChange={(e) => update(b.id, { style: e.target.value as '' | 'intro' })}>
              <option value="">Normal text</option>
              <option value="intro">Large intro text</option>
            </select>
          </div>
          <div className="be-row">
            <input
              type="text"
              placeholder="Section id (optional), e.g. problem"
              value={b.anchor || ''}
              onChange={(e) => update(b.id, { anchor: e.target.value.replace(/[^a-zA-Z0-9_-]/g, '') })}
            />
            <input
              type="text"
              placeholder="Section-nav label (needs a section id)"
              value={b.nav || ''}
              onChange={(e) => update(b.id, { nav: e.target.value })}
            />
            <label className="be-check">
              <input
                type="checkbox"
                checked={!!b.navHideMobile}
                onChange={(e) => update(b.id, { navHideMobile: e.target.checked })}
              />
              Hide on phones
            </label>
          </div>
        </>
      )}
    </div>
  );
}

function ItemsEditor({
  items,
  onChange,
  onUpload,
  busy,
}: {
  items: GalleryItem[];
  onChange: (items: GalleryItem[]) => void;
  onUpload: (files: FileList) => void;
  busy: boolean;
}) {
  return (
    <div className="be-items">
      {items.map((it, i) => (
        <div className="be-item" key={i}>
          {it.url ? <img className="be-thumb" src={it.url} alt="" /> : <span className="be-thumb" />}
          <div className="be-itemfields">
            <input
              type="text"
              placeholder="Image URL"
              value={it.url}
              onChange={(e) => onChange(setAt(items, i, { url: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Caption — **bold** part shows dark"
              value={it.caption}
              onChange={(e) => onChange(setAt(items, i, { caption: e.target.value }))}
            />
          </div>
          <ItemTools list={items} i={i} onChange={onChange} />
        </div>
      ))}
      <div className="be-row">
        <button type="button" className="be-addline" onClick={() => onChange([...items, { url: '', caption: '' }])}>
          + Screen by URL
        </button>
        <label className="be-addline be-upload">
          + Upload screens
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => {
              if (e.target.files?.length) onUpload(e.target.files);
              e.target.value = '';
            }}
          />
        </label>
        {busy && <span className="be-hint">Uploading…</span>}
      </div>
    </div>
  );
}
