import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import DailyResponse from './DailyResponse';

jest.mock('axios', () => ({ get: jest.fn(), put: jest.fn() }));
jest.mock('../../../components/common/Drawer.jsx', () => () => null);
jest.mock('../../../components/layout/Footer.jsx', () => () => null);
jest.mock('../../../components/layout/Header.jsx', () => ({ title }) => <h1>{title}</h1>);
jest.mock('../../../components/common/Loader.jsx', () => () => null);

const initialTask = { ID: 41, Goal_text: 'Read a chapter', Is_Complete: 0, Is_Submit: 0 };

function renderResponse() {
  localStorage.setItem('token', 'test-token');
  axios.get.mockResolvedValue({ data: { message: [initialTask], marks: 0 } });
  return render(<DailyResponse />);
}

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

test('sends a completion decision and displays backend marks', async () => {
  axios.put.mockResolvedValue({
    data: {
      task: { ...initialTask, Is_Complete: 1 },
      marks: 100,
      average: 10
    }
  });
  renderResponse();

  fireEvent.click(await screen.findByRole('button', { name: 'Complete Read a chapter' }));

  await waitFor(() => expect(axios.put).toHaveBeenCalledWith(
    expect.stringContaining('/daily-goals/41/completion'),
    { isComplete: true },
    { headers: { authorization: 'Bearer test-token' } }
  ));
  expect(await screen.findByText('100%', { selector: '.status-value' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Complete Read a chapter' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('progressbar', { name: 'Daily tasks completed' })).toHaveAttribute('aria-valuenow', '1');
});

test('sends an incomplete decision and updates task status from the response', async () => {
  axios.put.mockResolvedValue({
    data: {
      task: { ...initialTask, Is_Complete: 0 },
      marks: 0,
      average: 0
    }
  });
  renderResponse();

  fireEvent.click(await screen.findByRole('button', { name: 'Not Complete Read a chapter' }));

  await waitFor(() => expect(axios.put).toHaveBeenCalledWith(
    expect.stringContaining('/daily-goals/41/completion'),
    { isComplete: false },
    { headers: { authorization: 'Bearer test-token' } }
  ));
  expect(screen.getByRole('button', { name: 'Not Complete Read a chapter' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('progressbar', { name: 'Daily tasks completed' })).toHaveAttribute('aria-valuenow', '0');
});
