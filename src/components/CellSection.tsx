import { ReactNode, useState } from 'react';
import { Caption, Cell, IconContainer, Popper, Section } from '@xelene/tgui';

import { Icon28Chat } from '@xelene/tgui/dist/icons/28/chat';
import { Icon28Devices } from '@xelene/tgui/dist/icons/28/devices';
import { Icon28Stats } from '@xelene/tgui/dist/icons/28/stats';
import { useSwipeable } from 'react-swipeable';
import { useLongPress } from 'use-long-press';

type CellProps = {
  id: number;
  icon: ReactNode;
  text: string;
}

const cells: CellProps[] = [
  {
    id: 1,
    icon: <Icon28Chat />,
    text: 'Chat Settings',
  },
  {
    id: 2,
    icon: <Icon28Devices />,
    text: 'Data and Storage',
  },
  {
    id: 3,
    icon: <Icon28Stats />,
    text: 'Devices',
  },
];

export const CellSection = () => {
  const [text, setText] = useState('');
  window.Telegram?.WebApp.SettingsButton.onClick(() => {
    setText('Settings Pressed');
  });
  const [renderingCells, setRenderingCells] = useState(cells);
  const [longTapCellId, setLongTapCellId] = useState(-1);
  const SwipableCell = (props: CellProps) => {
    const swipeHandlers = useSwipeable({
      onSwiped: (eventData) => {
        setRenderingCells(renderingCells.filter(c => c.id !== props.id));
        console.log("User Swiped!", eventData);
      },
      delta: 10,                             // min distance(px) before a swipe starts. *See Notes*
      preventScrollOnSwipe: true,           // prevents scroll during swipe (*See Details*)
      trackTouch: true,                      // track touch input
      trackMouse: true,                     // track mouse input
      rotationAngle: 0,                      // set a rotation angle
      swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
      touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
    });
    const longTapHandler = useLongPress(() => {
      setLongTapCellId(props.id);
    });
    return <Cell
      key={props.id}
      {...swipeHandlers}
      {...longTapHandler}
      before={<IconContainer>{props.icon}</IconContainer>}
    >
      {longTapCellId === props.id ? 'Me is long tapped' : props.text}
    </Cell>
  }
  return <Section header={text} footer="And this is footer">
    {renderingCells.map((cell) => <SwipableCell {...cell}/>)}
    {/* <Popper
      arrowProps={{
        style: {
          color: 'var(--tgui--button_color)'
        }
      }}
      style={{
        background: 'var(--tgui--button_color)',
        color: 'var(--tgui--white)',
        padding: '10px 12px'
      }}
      targetRef={{
        getBoundingClientRect: function noRefCheck(){ return null }
      }}
    >
      <Caption level="1">
        Hello
      </Caption>
    </Popper> */}
  </Section>
};
