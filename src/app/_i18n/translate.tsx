import {FormattedMessage} from "react-intl";

const t = (key: string, options?: object) => <FormattedMessage id={key} values={{...options}} />;

export default t;