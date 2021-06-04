import Loader from './Loader';
import { FunctionComponent, MouseEvent } from 'react';
import { ActionConfiguration } from '../../lib/enrollment-actions-configuration';

type Props = ActionConfiguration['displayProps'] & {
  loading: boolean;
  isPendingAction: boolean;
  onClick: (event: MouseEvent<HTMLElement>) => void;
};

const FormActionButton: FunctionComponent<Props> = ({
  label,
  cssClass,
  loading,
  isPendingAction,
  onClick,
}) => (
  <button
    className={`fr-btn fr-btn--icon-right ${cssClass}`}
    onClick={onClick}
    disabled={loading}
  >
    <div>
      {label}
      {isPendingAction && <Loader small />}
    </div>
  </button>
);

export default FormActionButton;
