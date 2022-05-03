import { createContext, PropsWithChildren, useState } from 'react';
import { Status, StatusInfoInterface } from '../Interfaces/interfaces';

interface Context {
  statusInfo: StatusInfoInterface;
  changeStatusInfo: (status: Status, message: string) => void;
}

export const StatusInfoContext = createContext<Context>({
  statusInfo: {
    status: '',
    message: '',
  },
  changeStatusInfo: (status: Status, message: string) => {},
});

const StatusInfoProvider = (props: PropsWithChildren<any>) => {
  const [statusInfo, setStatusInfo] = useState<StatusInfoInterface>({
    status: '',
    message: '',
  });

  const changeStatusInfo = (status: Status, message: string) => {
    setStatusInfo({
      status,
      message,
    });
    setTimeout(() => {
      resetStatusInfo();
    }, 3000);
  };
  const resetStatusInfo = () => {
    setStatusInfo({
      status: '',
      message: '',
    });
  };

  const context = {
    statusInfo,
    changeStatusInfo,
  };

  return <StatusInfoContext.Provider value={context}>{props.children}</StatusInfoContext.Provider>;
};

export default StatusInfoProvider;

