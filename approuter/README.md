# Running App-Router Locally

To run app-router locally, follow these steps:

1. **Add `default-services.json` and `default-env.json` files** in the root directory.

2. **Modify `index.js`**:

    Add the following line at the beginning of `index.js`:
    ```javascript
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    ```
3. To Run :

    Add the following line at the beginning of `index.js`:
    ```sh
   npm start
    ```

4. Run backend(PORT=4000) and frontend(PORT=3000) application.

5. Access the application at http://localhost:5000

## Important!

**Don't forget to remove `process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'` before raising the PR.**
