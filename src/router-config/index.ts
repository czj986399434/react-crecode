import Blog from "../pages/blog/index";
import Article from "../pages/blog/article";
import CreativeWorkshop from "../pages/creative-workshop/index";
import Create from "../pages/creative-workshop/create";
import Index from "../pages/index";
export const routes = [
    {
      path: "/",
      component: Index,
      exact:true,
    },
    {
        path: "/blog",
        component: Blog,
        routes: [
          {
            path: "/article",
            component: Article,
          },
        ],
      },
      {
        path: "creative-shop",
        component: CreativeWorkshop,
        routes: [
          {
            path: "create",
            component: Create,
          },
        ],
      },
      
  ];
