# PhoenixVC Web Model

## Project Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/phoenixvc/web_model.git
   cd web_model
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the necessary environment variables. Refer to `.env.example` for the required variables.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build the project:**
   ```bash
   npm run build
   ```

6. **Start the production server:**
   ```bash
   npm start
   ```

## Features

### User Profile

- **Social Media Links:** Users can add and display their social media profiles (e.g., Twitter, LinkedIn) on their profile page.
- **Profile Picture Upload:** Users can upload and change their profile picture directly from the profile page.
- **Activity Filters:** Users can filter their recent activities by posts, comments, and likes.
- **Privacy Settings:** Users can manage their privacy settings, such as making their profile public or private.
- **Achievements and Badges:** Users can view their achievements and badges earned through their activities on the platform.
- **Friend List:** Users can add and manage a list of friends or connections.
- **User Statistics:** Users can view detailed statistics about their activities, such as the number of posts, comments, and likes.
- **Dark Mode:** Users can switch between light and dark mode for their profile page.
- **Customizable Profile Layout:** Users can customize the layout and appearance of their profile page.
- **Notification Settings:** Users can manage their notification preferences.

### Admin Dashboard

- **Parallel Data Fetching:** Optimized data fetching for users, blog posts, shop items, and events to reduce loading time.
- **Pagination:** Implemented pagination for users, blog posts, shop items, and events to reduce the amount of data loaded at once.
- **Memoized Components:** Memoized components that do not need to re-render frequently.
- **Debounced Input Handlers:** Debounced input handlers for search or filter functionalities to reduce the number of API calls.
- **State Management Library:** Used a state management library like Redux or Zustand to manage the state more efficiently.
- **Lazy Loading:** Lazy loaded components that are not immediately visible.
- **Optimized Images:** Ensured that images, such as user profile pictures, are optimized for faster loading times.
- **Reduced Unnecessary Re-renders:** Used `useCallback` and `useMemo` hooks to prevent unnecessary re-renders of components.
- **Caching:** Implemented caching mechanisms to store frequently accessed data and reduce the number of API calls.
- **Code Splitting:** Implemented code splitting to load only the necessary code for the current view, reducing the initial load time.

### Chat

- **Parallel Data Fetching:** Optimized data fetching for session and messages to reduce loading time.
- **Debounced Input Handlers:** Debounced input handlers for sending messages to reduce the number of socket emissions.
- **Memoized Components:** Memoized components that do not need to re-render frequently.
- **State Management Library:** Used a state management library like Redux or Zustand to manage the state more efficiently.
- **Lazy Loading:** Lazy loaded components that are not immediately visible.

### Notifications

- **Notification System:** Implemented a notification system to keep users informed about important updates.
- **Notification Preferences:** Users can manage their notification preferences.

### User Settings

- **Notification Preferences:** Users can manage their notification preferences.
- **Privacy Settings:** Users can manage their privacy settings, such as making their profile public or private.

### User Dashboard

- **Achievements and Badges:** Users can view their achievements and badges earned through their activities on the platform.
- **User Statistics:** Users can view detailed statistics about their activities, such as the number of posts, comments, and likes.

### Blog Post Listing

- **Search Functionality:** Users can search and filter blog posts.

### Error Handling

- **Robust Error Handling:** Implemented a more robust error handling mechanism across various components to provide meaningful error messages and fallback UI.

## Testing

- **Unit Tests:** Added unit tests for individual functions and components to ensure they work as expected.
- **Integration Tests:** Created integration tests to verify that different parts of the application work together correctly.
- **Mocking API Calls:** Used libraries like `axios-mock-adapter` to mock API calls and test how the components handle different responses.
- **Snapshot Tests:** Used snapshot testing to capture the rendered output of components and ensure it doesn't change unexpectedly.
- **Accessibility Tests:** Ensured the application is accessible by using tools like `axe-core` to check for accessibility issues.
- **End-to-end Tests:** Wrote end-to-end tests using tools like Cypress to simulate user interactions and verify that the application behaves correctly in a real-world scenario.
- **Error Handling Tests:** Tested how the application handles errors, such as failed API requests or invalid data, to ensure it provides a good user experience.
- **Performance Tests:** Measured the performance of the application and optimized it if necessary using tools like Lighthouse.
- **Code Coverage:** Ensured high code coverage by writing tests for all possible scenarios and edge cases using tools like Istanbul.
- **Continuous Integration:** Integrated tests into a continuous integration pipeline to automatically run tests on every push or pull request.

## Advanced React Hooks

- **useReducer:** Useful for managing complex state logic in a component.
- **useContext:** Allows accessing the React context for managing global state or passing data through the component tree.
- **useMemo:** Used to memoize expensive calculations and avoid re-computing them on every render.
- **useCallback:** Used to memoize callback functions and prevent them from being recreated on every render.
- **useRef:** Provides a way to create mutable references that persist across renders.
- **useImperativeHandle:** Allows customizing the instance value that is exposed when using `ref` in a parent component.
- **useLayoutEffect:** Similar to `useEffect`, but fires synchronously after all DOM mutations.
- **useDebugValue:** Used to display a label for custom hooks in React DevTools.

## Best Practices

- **Error Handling:** Use try-catch blocks, display user-friendly error messages, log errors, retry failed requests, provide fallback UI, validate API responses, use error boundaries, ensure graceful degradation, provide feedback, and test error scenarios.
- **Performance Optimization:** Optimize data fetching, debounce input handlers, memoize components, use a state management library, lazy load components, reduce unnecessary re-renders, implement caching, and code splitting.
- **Testing:** Write unit tests, integration tests, mock API calls, use snapshot tests, accessibility tests, end-to-end tests, error handling tests, performance tests, ensure high code coverage, and integrate tests into a continuous integration pipeline.
