# OSU MCP Server

An MCP (Model Context Protocol) server that provides access to The Ohio State University's public APIs for bus routes, class schedules, dining information, and parking availability.

## Features

This server provides the following tools for LLMs:

### Bus
- **get_bus_routes**: Get information about all OSU bus routes
- **get_bus_stops**: Get stops and route information for a specific bus line
- **get_bus_vehicles**: Get real-time vehicle locations for a specific route

### Class
- **search_classes**: Search for OSU classes by keyword, subject, instructor, etc.

### Dining
- **get_dining_locations**: Get all OSU dining locations with basic information
- **get_dining_locations_with_menus**: Get dining locations with menu section information
- **get_dining_menu**: Get detailed menu items for a specific dining location section

### Parking
- **get_parking_availability**: Get real-time parking availability for all OSU parking garages

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the server:
   ```bash
   npm run build
   ```

## Usage

### With Claude Desktop

Add this server to your Claude Desktop configuration file:

**On macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**On Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "osu": {
      "command": "node",
      "args": ["/path/to/Ohio-State-MCP/build/index.js"]
    }
  }
}
```

### Standalone Usage

You can also run the server directly:

```bash
npm start
```

## Development

To run in development mode with automatic rebuilding:

```bash
npm run dev
```

## API Information

This server uses The Ohio State University's APIs:

- **Bus API**: `https://content.osu.edu/v2/bus/`
- **Class API**: `https://content.osu.edu/v2/classes/`  
- **Dining API**: `https://content.osu.edu/v2/api/v1/dining/`
- **Parking API**: `https://content.osu.edu/v2/parking/garages/`

## License

MIT