import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Chat from '@/ui/Chat';

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <h1 className="text-center text-3xl font-bold text-orange-400">
        chat app
      </h1>
      <Chat />
    </Main>
  );
};

export default Index;
