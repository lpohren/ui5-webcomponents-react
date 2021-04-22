import { render, screen, waitFor } from '@shared/tests';
import { Dialog } from '@ui5/webcomponents-react/dist/Dialog';
import React, { createRef } from 'react';
import userEvent from '@testing-library/user-event';
import { Ui5DialogDomRef } from '../../interfaces/Ui5DialogDomRef';

describe('Dialog', () => {
  test('Basic Test (generated)', () => {
    const { asFragment } = render(<Dialog />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('open and close dialog via ref', async () => {
    const ref = createRef<Ui5DialogDomRef>();
    const onAfterOpen = jest.fn();
    const onAfterClose = jest.fn();
    render(
      <Dialog ref={ref} onAfterOpen={onAfterOpen} onAfterClose={onAfterClose}>
        <input aria-label={'test input'} />
      </Dialog>
    );

    const opener = ref.current.open();
    await waitFor(() => opener);

    userEvent.type(screen.getByLabelText('test input'), 'Hello World!');

    expect(onAfterOpen).toHaveBeenCalledTimes(1);
    expect(onAfterClose).not.toHaveBeenCalled();
    expect(screen.getByLabelText('test input')).toBeVisible();

    ref.current.close();
    expect(onAfterClose).toHaveBeenCalledTimes(1);
  });
});
