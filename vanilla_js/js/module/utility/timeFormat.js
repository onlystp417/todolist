export default function (timeStamp) {
  const year = timeStamp.getFullYear();
  const month = timeStamp.getMonth() + 1;
  const day = timeStamp.getDate();

  return `${ year }.${ month }.${ day }`;
}