// import {
//   createPlugin,
//   createRoutableExtension,
// } from '@backstage/core-plugin-api';
// import { rootRouteRef } from './routes';

// export const githubRepoCreatorPlugin = createPlugin({
//   id: 'github-repo-creator',
//   routes: {
//     root: rootRouteRef,
//   },
// });

// export const GithubRepoCreatorPage = githubRepoCreatorPlugin.provide(
//   createRoutableExtension({
//     name: 'GitHubRepoCreatorPage',
//     component: () =>
//       import('./components/GithubRepoCreator').then(m => m.GithubRepoCreator),
//     mountPoint: rootRouteRef,
//   }),
// );
import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';
import { rootRouteRef } from './routes';

export const githubRepoCreatorPlugin = createPlugin({
  id: 'github-repo-creator',
  routes: {
    root: rootRouteRef,
  },
});

export const GithubRepoCreatorPage = githubRepoCreatorPlugin.provide(
  createRoutableExtension({
    name: 'GitHubRepoCreatorPage',
    component: () =>
      import('./components/GithubRepoCreator').then(module => module.default), // Ensure to access default export if that's how your component is exported
    mountPoint: rootRouteRef,
  }),
);

