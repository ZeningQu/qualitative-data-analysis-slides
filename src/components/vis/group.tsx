import * as d3 from 'd3';

export interface GroupProps {
  parent: d3.Selection<any, any, any, any>;
  className: string;
}

export function newGroup(props: GroupProps) {
  const { parent, className } = props;
  parent.select('.' + className).remove();
  return parent.append("g").attr("class", className);
}
