interface Props {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (value: number) => void;
}

export const Pagination = ({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
}: Props) => {
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  return (
    <div className="flex gap-3">
      <span onClick={onPrevious}>Prev</span>
      <span>{currentPage}</span>
      <span onClick={onNext}>Next</span>
    </div>
  );
};
