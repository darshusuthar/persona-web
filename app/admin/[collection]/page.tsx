import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCollection } from '@/lib/admin/collections';
import { createSupabaseServer } from '@/lib/supabase/serverClient';
import DeleteButton from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function CollectionList({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const col = getCollection(collection);
  if (!col) notFound();

  const supabase = await createSupabaseServer();
  const { data: rows } = await supabase
    .from(col.table)
    .select('*')
    .order(col.listColumns.includes('sort_order') ? 'sort_order' : col.pk, {
      ascending: true,
    });

  const count = rows?.length ?? 0;

  return (
    <div>
      <header className="adm-pagehead">
        <div>
          <h1 className="adm-h1">{col.label}</h1>
          <p className="adm-sub">
            {count} {count === 1 ? col.singular.toLowerCase() : col.label.toLowerCase()}
          </p>
        </div>
        <Link href={`/admin/${col.key}/new`} className="adm-btn">
          + New {col.singular.toLowerCase()}
        </Link>
      </header>

      <div className="adm-panel">
        <table className="adm-table">
          <thead>
            <tr>
              {col.listColumns.map((c) => (
                <th key={c}>{c.replace(/_/g, ' ')}</th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).map((r) => {
              const id = r[col.pk];
              return (
                <tr key={String(id)}>
                  {col.listColumns.map((c, i) => {
                    const val = r[c];
                    let cell: React.ReactNode = String(val ?? '');
                    if (c === 'status' && val) {
                      cell = <span className={`adm-pill adm-pill-${val}`}>{String(val)}</span>;
                    } else if (i === 0) {
                      cell = <span className="adm-cell-title">{String(val ?? '')}</span>;
                    }
                    return <td key={c}>{cell}</td>;
                  })}
                  <td className="adm-rowactions">
                    <Link
                      href={`/admin/${col.key}/${encodeURIComponent(String(id))}`}
                      className="adm-edit"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      table={col.table}
                      pk={col.pk}
                      id={id}
                      label={String(r[col.titleField] ?? id)}
                    />
                  </td>
                </tr>
              );
            })}
            {(!rows || rows.length === 0) && (
              <tr>
                <td colSpan={col.listColumns.length + 1} className="adm-empty">
                  Nothing here yet. Click “New {col.singular.toLowerCase()}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
