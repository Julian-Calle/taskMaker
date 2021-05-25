import './completed.css';
export default function Completed() {
  const words = 'Completed'.split('');
  words.map((letra) => {
    console.log(letra);
  });
  return (
    <div className="center">
      {words.map((word, index) => {
        return <span className={`circle${index}`}>{word}</span>;
      })}
    </div>
  );
}
