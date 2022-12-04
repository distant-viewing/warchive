export function getGradColor(start_color: string, end_color: string, percent: number) {
  if (percent == 0) { return("#fff"); }

  // strip the leading # if it's there
  start_color = start_color.replace(/^\s*#|\s*$/g, "");
  end_color = end_color.replace(/^\s*#|\s*$/g, "");

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if(start_color.length == 3){
    start_color = start_color.replace(/(.)/g, "$1$1");
  }

  if(end_color.length == 3){
    end_color = end_color.replace(/(.)/g, "$1$1");
  }

  // get colors
  const start_red = parseInt(start_color.substr(0, 2), 16),
    start_green = parseInt(start_color.substr(2, 2), 16),
    start_blue = parseInt(start_color.substr(4, 2), 16);

  const end_red = parseInt(end_color.substr(0, 2), 16),
    end_green = parseInt(end_color.substr(2, 2), 16),
    end_blue = parseInt(end_color.substr(4, 2), 16);

  // calculate new color
  let diff_red = end_red - start_red;
  let diff_green = end_green - start_green;
  let diff_blue = end_blue - start_blue;

  diff_red = ( (diff_red * percent) + start_red ).toString(16).split(".")[0];
  diff_green = ( (diff_green * percent) + start_green ).toString(16).split(".")[0];
  diff_blue = ( (diff_blue * percent) + start_blue ).toString(16).split(".")[0];

  // ensure 2 digits by color
  if( diff_red.length == 1 ) diff_red = "0" + diff_red;
  if( diff_green.length == 1 ) diff_green = "0" + diff_green;
  if( diff_blue.length == 1 ) diff_blue = "0" + diff_blue;

  return "#" + diff_red + diff_green + diff_blue;
}


export function getFillColor(counts: array) {
  let max_val = Math.max(...Object.values(counts));
  max_val = max_val === 0 ? 1 : max_val;

  const geoFill = counts.slice(1, counts.length).map((val) => {
    return (getGradColor("#ecf2f3", "#617475", val / max_val) );
  });

  return(geoFill);
}


export function countItems(items: Record<string, unknown>, schema: Record<string, unknown>) {

  const keys = Object.keys(schema);
  const counts = {};
  for (let j = 0; j < keys.length; j++)
  {
    counts[keys[j]] = new Array(schema[keys[j]]["values"].length);

    for (let i = 0; i < counts[keys[j]].length; i++)
    {
      counts[keys[j]][i] = 0;
    }
    for (let i = 0; i < items.length; i++)
    {
      counts[keys[j]][items[i][keys[j]]] += 1;
    }
  }

  return(counts);
}


export function filterItems(items: Record<string, unknown>, filters: Record<string, unknown>) {
  const keys = Object.keys(filters);
  for (let j = 0; j < keys.length; j++) {
    items = items.filter(val => {
      return(filters[keys[j]].includes(val[keys[j]]));
    });
  }

  return(items);
}
