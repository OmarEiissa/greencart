const TitleForPage = ({
  title,
  classNameForDiv,
  classNameForP,
  classNameForSpan,
}) => {
  return (
    <div className={`flex flex-col items-end w-max ${classNameForDiv}`}>
      <p className={`text-2xl font-medium uppercase ${classNameForP}`}>
        {title}
      </p>
      <span
        className={`w-16 h-0.5 bg-primary rounded-full ${classNameForSpan}`}
      />
    </div>
  );
};

export default TitleForPage;
