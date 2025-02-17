export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div>
      <strong>{message}</strong>
    </div>
  );
}
