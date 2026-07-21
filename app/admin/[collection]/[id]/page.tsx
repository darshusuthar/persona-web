import { notFound } from 'next/navigation';
import { getCollection } from '@/lib/admin/collections';
import { createSupabaseServer } from '@/lib/supabase/serverClient';
import RecordForm from '@/components/admin/RecordForm';

export const dynamic = 'force-dynamic';

export default async function EditRecord({
  params,
}: {
  params: Promise<{ collection: string; id: string }>;
}) {
  const { collection, id } = await params;
  const col = getCollection(collection);
  if (!col) notFound();

  const isNew = id === 'new';
  let record: Record<string, unknown> = {};

  if (!isNew) {
    const supabase = await createSupabaseServer();
    const { data } = await supabase
      .from(col.table)
      .select('*')
      .eq(col.pk, decodeURIComponent(id))
      .single();
    if (!data) notFound();
    record = data;
  }

  return (
    <div>
      <h1 className="adm-h1">
        {isNew ? `New ${col.singular.toLowerCase()}` : `Edit ${col.singular.toLowerCase()}`}
      </h1>
      <RecordForm collection={col} record={record} isNew={isNew} />
    </div>
  );
}
