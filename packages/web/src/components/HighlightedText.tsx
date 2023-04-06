type HighlightedTextProps = {
  text: string;
  search?: string;
};

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  search,
}) => {
  if (!search) {
    return <div>{text}</div>;
  }
  const regex = new RegExp(search, 'gi');
  const highlightedText = text.replace(
    regex,
    `<span class="highlight">$&</span>`
  );
  return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
};
