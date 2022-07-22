import Button from './Button';

const Buttons = () => {
  return (
    <>
      {[...Array(220)].map((_, index) => (
        <Button key={index} col={index % 11} row={Math.floor(index / 11) + 1} />
      ))}
    </>
  );
};
export default Buttons;
