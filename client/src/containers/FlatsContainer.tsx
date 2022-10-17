import useFlats from '../hooks/useFlats';

const FlatsContainer = () => {
  const { data, isLoading, error } = useFlats();

  if (isLoading) return <p>Loading...</p>;

  if (error) {
    return (
      <>
        <p>Something went wrong.</p>
      </>
    );
  }

  return (
    <>
      <div>
        {data?.flats?.map(flat => (
          <div>
            <h3>{flat.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default FlatsContainer;
