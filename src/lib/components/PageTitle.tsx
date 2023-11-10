import Typewriter from 'typewriter-effect';
import '~/App.css';

interface PageTitleProps {
  title: string;
}

const PageTitle = (props: PageTitleProps) => {
  const { title } = props;
  return (
    <Typewriter
      options={{
        loop: true,
        autoStart: true,
        strings: [title],
      }}
    />
  );
};

export default PageTitle;
