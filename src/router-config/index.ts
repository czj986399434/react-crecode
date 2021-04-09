import Blog from "../pages/blog/index";
import BlogList from '../pages/blog/blog-list'
import Article from "../pages/blog/article";
import CreativeWorkshop from "../pages/creative-workshop/index";
import Create from "../pages/creative-workshop/create";
import Index from "../pages/index";
import Space from "../pages/space/index";
// export const routes = [
//   {
//     path: "/",
//     component: Index,
//     exact: true,
//     routes: [],
//   },
//   {
//     path: "/blog",
//     component: Blog,
//     exact: true,
//     routes: [],
//   },
//   {
//     path: "/blog/article",
//     component: Article,
//   },
//   {
//     path: "/creative-workshop",
//     component: CreativeWorkshop,

//     routes: [
//       {
//         path: "/creative-workshop/create",
//         component: Create,
//       },
//     ],
//   },
//   {
//     path: "/space",
//     component: Space,
//   },
// ];
const routes = [
  {
    path: "/",
    component: Index,
    routes: [
      {
        path:'/blog-list',
        component:BlogList
      },
      {
        path: "/blog/index",
        component: Blog,
        routes: [
          {
            path: "/blog/article",
            component: Article,
          },
        ],
      },
      {
        path: "/creative-workshop",
        component: CreativeWorkshop,
        routes: [
          {
            path: "create",
            component: Create,
          },
        ],
      },
      {
        path:'/space',
        component:Space,
      }
    ],
  },
];
const change = (routes: any[]) => {
  if (routes.length === 0) return [];
  const result: any[] = [];
  const func = (routes: any, str: string) => {
    routes.forEach((route: any) => {
      route.exact=true
      if (route.path[0] === "/") {
        const routeRoutes = route.routes;
        delete route.routes;
        result.push({ ...route });

        if (routeRoutes) func(routeRoutes, route.path);
      } else {
        const routeRoutes = route.routes;
        delete route.routes;
        result.push({ ...route, path: `${str}/${route.path}` });
        if (routeRoutes) func(routeRoutes, `${str}/${route.path}`);
      }
    });
  };
  func(routes, "/");
  return result;
};
export default change(routes)
