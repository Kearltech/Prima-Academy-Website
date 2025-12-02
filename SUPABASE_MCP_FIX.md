# Fix Supabase MCP Server Connection Issue

## Problem
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '...@supabase/mcp-server-supabase/dist/chunk-VDOW5J7J.js'
```

This error occurs because the npx cache is corrupted when Cursor tries to run the Supabase MCP server.

## ✅ Solution Applied

1. **Cleared npm cache**: `npm cache clean --force`
2. **Cleared npx cache**: Removed `%LOCALAPPDATA%\npm-cache\_npx`
3. **Installed globally**: `npm install -g @supabase/mcp-server-supabase@latest`

## 🔧 Fix Cursor MCP Configuration

You need to update your Cursor MCP settings to use the global installation instead of npx.

### Option 1: Use Global Installation (Recommended)

1. Open Cursor Settings (Ctrl+,)
2. Search for "MCP" or "Model Context Protocol"
3. Find the Supabase MCP server configuration
4. Update the command from:
   ```json
   "command": "npx",
   "args": ["@supabase/mcp-server-supabase"]
   ```
   
   To:
   ```json
   "command": "node",
   "args": ["C:\\Users\\HP\\AppData\\Roaming\\npm\\node_modules\\@supabase\\mcp-server-supabase\\dist\\transports\\stdio.js"]
   ```

### Option 2: Use npx with Full Path

Alternatively, you can use npx but ensure it's pointing to the correct version:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["--yes", "@supabase/mcp-server-supabase@0.5.9"]
    }
  }
}
```

### Option 3: Use npm exec (Alternative)

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npm",
      "args": ["exec", "--yes", "@supabase/mcp-server-supabase"]
    }
  }
}
```

## 📍 Where to Find Cursor MCP Settings

The MCP configuration is typically located in one of these places:

1. **Cursor Settings UI**: 
   - Press `Ctrl+,` (or `Cmd+,` on Mac)
   - Search for "MCP" or "Model Context Protocol"
   - Look for "MCP Servers" section

2. **Settings JSON File**:
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Preferences: Open User Settings (JSON)"
   - Look for `mcpServers` or `mcp.servers` configuration

3. **Config File Location** (Windows):
   ```
   %APPDATA%\Cursor\User\settings.json
   ```
   Or:
   ```
   C:\Users\HP\AppData\Roaming\Cursor\User\settings.json
   ```

## 🔍 Verify Installation

After updating the configuration, verify the installation works:

```powershell
# Test the global installation
node "C:\Users\HP\AppData\Roaming\npm\node_modules\@supabase\mcp-server-supabase\dist\transports\stdio.js"
```

If it runs without errors, the configuration should work.

## 🚨 If Still Having Issues

1. **Restart Cursor** completely after changing MCP settings
2. **Check Cursor logs**:
   - Help → Toggle Developer Tools
   - Check Console for MCP-related errors
3. **Verify Node.js path**:
   ```powershell
   where.exe node
   ```
4. **Reinstall the package**:
   ```powershell
   npm uninstall -g @supabase/mcp-server-supabase
   npm install -g @supabase/mcp-server-supabase@latest
   ```

## 📝 Required Environment Variables

Make sure you have your Supabase credentials configured. The MCP server needs:

- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for admin operations)

You can set these in:
1. Cursor's MCP server configuration (as `env` variables)
2. System environment variables
3. A `.env` file (if the MCP server supports it)

## ✅ Current Status

- ✅ npm cache cleared
- ✅ npx cache cleared  
- ✅ Package installed globally (v0.5.9)
- ✅ Executable found at: `C:\Users\HP\AppData\Roaming\npm\node_modules\@supabase\mcp-server-supabase\dist\transports\stdio.js`

**Next Step**: Update your Cursor MCP configuration using one of the options above, then restart Cursor.

