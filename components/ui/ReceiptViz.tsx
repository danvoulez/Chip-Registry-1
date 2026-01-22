import Image from 'next/image';

export default function ReceiptViz({
  src,
  blurhash,
  alt
}: {
  src: string | null;
  blurhash: string | null;
  alt: string;
}) {
  if (!src) {
    return (
      <div className="flex h-40 w-full items-center justify-center rounded-card border border-border bg-surface text-xs text-secondary">
        {blurhash ? `Blurhash ${blurhash}` : 'No preview'}
      </div>
    );
  }

  return (
    <div className="relative h-40 w-full overflow-hidden rounded-card border border-border bg-surface">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
