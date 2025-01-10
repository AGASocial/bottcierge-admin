import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Server, ServerStatus } from '../../types';
import { serverService } from '../../services/serverService';

interface ServerState {
  servers: Server[];
  loading: boolean;
  error: string | null;
}

const initialState: ServerState = {
  servers: [],
  loading: false,
  error: null,
};

export const fetchServers = createAsyncThunk(
  'server/fetchServers',
  async () => {
    const response = await serverService.getServers();
    return response;
  }
);

export const createServer = createAsyncThunk(
  'server/createServer',
  async (serverData: Partial<Server>) => {
    const response = await serverService.createServer(serverData);
    return response;
  }
);

export const updateServer = createAsyncThunk(
  'server/updateServer',
  async ({ serverId, data }: { serverId: string; data: Partial<Server> }) => {
    const response = await serverService.updateServer(serverId, data);
    return response;
  }
);

export const updateServerStatus = createAsyncThunk(
  'server/updateServerStatus',
  async ({ serverId, status }: { serverId: string; status: ServerStatus }) => {
    const response = await serverService.updateServerStatus(serverId, status);
    return response;
  }
);

const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Servers
      .addCase(fetchServers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServers.fulfilled, (state, action) => {
        state.loading = false;
        state.servers = action.payload;
      })
      .addCase(fetchServers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch servers';
      })
      // Create Server
      .addCase(createServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createServer.fulfilled, (state, action) => {
        state.loading = false;
        state.servers.push(action.payload);
      })
      .addCase(createServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create server';
      })
      // Update Server
      .addCase(updateServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateServer.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.servers.findIndex(server => server.id === action.payload.id);
        if (index !== -1) {
          state.servers[index] = action.payload;
        }
      })
      .addCase(updateServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update server';
      })
      // Update Server Status
      .addCase(updateServerStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateServerStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.servers.findIndex(server => server.id === action.payload.id);
        if (index !== -1) {
          state.servers[index] = action.payload;
        }
      })
      .addCase(updateServerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update server status';
      });
  },
});

export default serverSlice.reducer;
