type Props = {
  title: string;
  description: string;
};

export default function SectionInfo({ title, description }: Props) {
  return (
    <div className="">
      <h2 className="font-medium text-2xl text-textGray">{title}</h2>
      <p className="text-base text-textGray">{description}</p>
    </div>
  );
}
