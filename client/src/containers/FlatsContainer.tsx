import { useRouter } from 'next/router';
import Button from '../components/Button';
import Item from '../components/Item';

import { useFlats } from '../hooks/useFlats';

const FlatsContainer: React.FC = () => {
  const router = useRouter();
  const { page = '1' } = router.query;
  const { data, error } = useFlats(Number(page));

  if (error) {
    return (
      <>
        <p>Something went wrong.</p>
      </>
    );
  }

  if (!data) return <p>Loading...</p>;

  return data?.flats?.length > 0 ? (
    <>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {data?.flats?.map(flat => (
          <Item key={flat.id} imageUrl={flat.image_url} title={flat.title} />
        ))}
      </div>
      <div className="mt-16">
        <div className="flex items-center justify-evenly min-w-full">
          <Button
            onClick={() =>
              router.push({
                query: { page: Number(page) - 1 },
              })
            }
            disabled={Number(page) <= 1}
          >
            Previous
          </Button>
          <p className="font-medium">{page}</p>
          <Button
            onClick={() =>
              router.push({
                query: { page: Number(page) + 1 },
              })
            }
            disabled={data!.flatsCount < Number(page) * 20}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  ) : (
    <>
      <p>No flats found.</p>
    </>
  );
};

export default FlatsContainer;
