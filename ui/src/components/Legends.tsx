import React from 'react';
import styled from 'styled-components';
import { Trace } from '~/models';
import { Map } from 'immutable';


const ToggleOn = (): React.ReactElement => (<i className="far fa-check-square"></i>);
const ToggleOff = (): React.ReactElement => (<i className="far fa-square"></i>);
const Layout = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
`;
type Value = {
  id: string;
  name: string;
}
export interface IProps {
  values: Value[];
  onClick: (id: string) => void;
}
export default (props: IProps) => {
  const {values, onClick} = props;
  return (
    <div className="field is-grouped is-grouped-multiline">
      {
        values.map(v =>(
          <div className="control" key={v.id}>
            <div className="tags has-addons">
              <a className="tag is-dark">{v.name}</a>
              <a className="tag is-delete" onClick={() => onClick(v.id)}></a>
            </div>
          </div>
        ))
      }
    </div>
  );
};
