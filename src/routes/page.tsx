import { Button } from '@douyinfe/semi-ui';
import { Helmet } from '@modern-js/runtime/head';
import './index.css';

const Index = () => (
  <div className="container-box">
    <Helmet>
      <link
        rel="icon"
        type="image/x-icon"
        href="https://lf3-static.bytednsdoc.com/obj/eden-cn/uhbfnupenuhf/favicon.ico"
      />
    </Helmet>
    <main>
      <h1 className="underline">Welcome to BetterHYQ</h1>
      <div className="btn-margin-right">
        <Button>主要按钮</Button>
        <Button type="secondary">次要按钮</Button>
        <Button type="tertiary">第三按钮</Button>
        <Button type="warning">警告按钮</Button>
        <Button type="danger">危险按钮</Button>
      </div>
    </main>
  </div>
);

export default Index;
