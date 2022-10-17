import { useRouter } from 'next/router';

import { useFlats } from '../hooks/useFlats';

const FlatsContainer = () => {
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
      <div>
        {data?.flats?.map(flat => (
          <div key={flat.id}>
            <h3>{flat.title}</h3>
            <img src={flat.image_url} alt={flat.title} />
          </div>
        ))}
      </div>
      <br />
      <div>
        <button
          onClick={() =>
            router.push({
              query: { page: Number(page) - 1 },
            })
          }
          disabled={Number(page) <= 1}
        >
          Previous
        </button>
        {page}
        <button
          onClick={() =>
            router.push({
              query: { page: Number(page) + 1 },
            })
          }
          disabled={data!.flatsCount < Number(page) * 20}
        >
          Next
        </button>
      </div>
    </>
  ) : (
    <>
      <p>No flats found.</p>
    </>
  );
};

export default FlatsContainer;
