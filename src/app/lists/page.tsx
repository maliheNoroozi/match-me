import { fetchCurrentUserLikeIds, fetchLikeMembers } from "@/actions/like";
import { ListsTab } from "@/components/lists/lists-tab";

interface Props {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function ListsPage({ searchParams }: Props) {
  const { type } = await searchParams;
  const members = await fetchLikeMembers(type);
  const likeIds = await fetchCurrentUserLikeIds();

  return (
    <div className="p-4">
      <ListsTab members={members} likeIds={likeIds} />
    </div>
  );
}
