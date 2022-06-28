import { act, renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import faker from 'faker';
import { FetchState } from '../types';
import { useGetSongs } from './api-hooks';

describe('api hooks utilities', () => {
  describe('useGetSongs()', () => {
    const renderCustomHook = () => renderHook(() => useGetSongs());

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return initial value', () => {
      const hook = renderCustomHook();
      const [songs, fetchState, getSongs] = hook.result.current;

      expect(songs).toEqual([]);
      expect(fetchState).toBe(FetchState.DEFAULT);
      expect(typeof getSongs).toBe('function');
    });

    it('should have expected endpoint on api call', async () => {
      const axiosGetSpy = jest
        .spyOn(axios, 'get')
        .mockResolvedValue({ data: [] });

      const hook = renderCustomHook();
      const getSongs = hook.result.current[2];

      await act(async () => {
        await getSongs();
      });

      expect(axiosGetSpy).toBeCalledTimes(1);
      expect(axiosGetSpy).toBeCalledWith(
        'https://api-stg.jam-community.com/song/trending'
      );
    });

    it('should have expected states on api call', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({ data: [] });

      const hook = renderCustomHook();
      const getSongs = hook.result.current[2];

      const promiseAct = act(async () => {
        await getSongs();
      });

      const [songs, fetchState] = hook.result.current;

      expect(songs).toEqual([]);
      expect(fetchState).toBe(FetchState.LOADING);

      await promiseAct;
    });

    it('should have expected states on api error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue({});

      const hook = renderCustomHook();
      const getSongs = hook.result.current[2];

      await act(async () => {
        await getSongs();
      });

      const [songs, fetchState] = hook.result.current;

      expect(songs).toEqual([]);
      expect(fetchState).toBe(FetchState.ERROR);
    });

    it('should have expected states on api success', async () => {
      const res = {
        data: [
          {
            id: faker.datatype.string(),
            name: faker.datatype.string(),
            description:faker.datatype.string(),
            music_file_path:faker.datatype.string(),
            cover_image_path: faker.datatype.string(),
            likes:faker.datatype.number(),
          
          },
        ],
      };

      jest.spyOn(axios, 'get').mockResolvedValue(res);

      const hook = renderCustomHook();
      const getSongs = hook.result.current[2];

      await act(async () => {
        await getSongs();
      });

      const [songs, fetchState] = hook.result.current;

      expect(songs).toEqual(res.data);
      expect(fetchState).toBe(FetchState.SUCCESS);
    });
  });
});