export const trimSnackBarText = (text = "") => {
  const maxLength = 52;

  return text.length > maxLength ? `${text.substr(0, maxLength - 5)}...` : text;
};

export const nameTructed = (name, tructedLength) => {
  if (name?.length > tructedLength) {
    if (tructedLength === 15) {
      return `${name.substr(0, 12)}...`;
    } else {
      return `${name.substr(0, tructedLength)}...`;
    }
  } else {
    return name;
  }
};

export const json_verify = (s) => {
  try {
    JSON.parse(s);
    return true;
  } catch (e) {
    return false;
  }
};

export function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes;
  return strTime;
}

export function formatDDMMYY(date) {
  var options = { day: "numeric", month: "long", year: "numeric" };
  var strTime = date.toLocaleDateString("ru-RU", options);
  var result = strTime.substring(0, strTime.length - 3);
  return result;
}
