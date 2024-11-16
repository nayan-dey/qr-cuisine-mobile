export default function LogsHelper({
  key_,
  value,
}: {
  key_?: string;
  value: any;
}) {
  let key = arguments.length == 2 ? arguments[0] : "";
  let obj =
    arguments.length == 1
      ? arguments[0]
      : arguments.length == 2
        ? arguments[1]
        : "";
  console.log(key, JSON.stringify(obj, null, 4));
}
