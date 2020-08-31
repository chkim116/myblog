export function registerCheck(err, url, { history }) {
  const { data } = err.response;
  if (data !== undefined) {
    history.push(`/${url}`);
    alert("Exist. return go back.");
  }
}
