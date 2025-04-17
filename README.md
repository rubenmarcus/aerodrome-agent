# Aerodrome AI Agent

A powerful AI assistant specialized in providing detailed information and analytics about the Aerodrome Protocol on Base network. This assistant helps users understand and interact with the Aerodrome ecosystem through various tools and endpoints.

## Features

- 🔍 Pool Analytics: Get detailed information about any Aerodrome pool
- 📊 Gauge Analysis: View and analyze gauge performance and rewards
- 💼 Portfolio Tracking: Monitor LP positions and rewards
- 📈 Yield Optimization: Get optimal farming strategies based on risk tolerance
- 🏗️ Position Management: Help users enter/exit positions with minimal slippage
- 💸 Bribe Strategy: Analyze bribe ROI and recommend efficient bribing approaches
- 🛣️ Multi-pool Routing: Find optimal swap paths across different liquidity pools
- 🗳️ Voting Power: Track veAERO voting power and boost multipliers

## Available Tools

### 1. Pool Analytics
- Endpoint: `/api/tools/aerodrome/pool-analytics`
- Retrieves detailed information about a pool including:
  - APR/APY
  - 24h volume
  - TVL
  - Impermanent loss calculations

Example prompts:
```
"Get analytics for the USDC/ETH pool on Aerodrome"
"Show me the current APR and TVL for the AERO/ETH pool"
"Compare the trading volume and fees between USDC/ETH and USDC/USDT pools"
"What's the impermanent loss risk for the ETH/WETH pool?"
"Analyze the historical performance of the USDC/DAI pool"
```

### 2. Gauge Analysis
- Endpoint: `/api/tools/aerodrome/gauge-analysis`
- Features:
  - Current emissions rate
  - Required voting power
  - Boost multiplier
  - Optimal voting strategy

Example prompts:
```
"Analyze the gauge for the USDC/ETH pool and recommend a voting strategy"
"What's the current emissions rate for the AERO/ETH gauge?"
"Calculate the required voting power to get maximum boost in the USDC/USDT gauge"
"Compare the rewards between different gauges for the same pool"
"What's the optimal voting strategy for maximizing AERO emissions?"
```

### 3. Portfolio Tracking
- Endpoint: `/api/tools/aerodrome/portfolio-tracking`
- Provides comprehensive portfolio information:
  - Total portfolio value
  - Individual LP positions
  - Pending rewards
  - Position values

Example prompts:
```
"Show me my portfolio value and positions on Aerodrome"
"What's my current LP position in the USDC/ETH pool?"
"Calculate my total pending rewards across all positions"
"Show me my portfolio performance over the last 7 days"
"What's the current value of my AERO/ETH LP tokens?"
```

### 4. Yield Optimization
- Endpoint: `/api/tools/aerodrome/yield-optimization`
- Features:
  - Risk-adjusted strategies
  - Expected yields
  - Pool recommendations
  - Risk levels

Example prompts:
```
"Recommend the best yield farming strategies for medium risk tolerance"
"What are the highest APY pools with low risk?"
"Compare yield opportunities between stablecoin and volatile pairs"
"Suggest optimal LP positions for a $10,000 investment"
"What's the best yield strategy considering current market conditions?"
```

### 5. Position Management
- Endpoint: `/api/tools/aerodrome/position-management`
- Features:
  - Entry/exit strategies
  - Slippage optimization
  - Position sizing
  - Risk management

Example prompts:
```
"Help me enter a position in the USDC/ETH pool with minimal slippage"
"What's the optimal way to exit my AERO/ETH position?"
"Calculate the best entry point for $5,000 into the USDC/USDT pool"
"Suggest a position sizing strategy for multiple pools"
"How can I minimize impermanent loss when entering a new position?"
```

### 6. Bribe Strategy
- Endpoint: `/api/tools/aerodrome/bribe-strategy`
- Features:
  - Bribe ROI analysis
  - Optimal bribe amounts
  - Timing recommendations
  - Cost-benefit analysis

Example prompts:
```
"Analyze the ROI of bribing the USDC/ETH gauge"
"What's the optimal bribe amount for the AERO/ETH gauge?"
"When is the best time to place a bribe for maximum impact?"
"Compare bribe strategies between different gauges"
"Calculate the break-even point for a $1,000 bribe"
```

### 7. Multi-pool Routing
- Endpoint: `/api/tools/aerodrome/optimal-routing`
- Features:
  - Optimal swap paths
  - Slippage calculations
  - Gas cost estimates
  - Best execution

Example prompts:
```
"Find the best route to swap 1000 USDC to ETH"
"Calculate the most gas-efficient path for swapping AERO to USDC"
"What's the optimal route for a large ETH to USDT swap?"
"Compare different swap paths for minimal slippage"
"Find the best execution for a multi-hop swap from USDC to AERO"
```

### 8. Voting Power
- Endpoint: `/api/tools/aerodrome/voting-power`
- Features:
  - veAERO balance
  - Voting power
  - Lock expiry
  - Boost multiplier

Example prompts:
```
"Check my voting power and boost multiplier"
"What's my current veAERO balance and lock expiry?"
"Calculate the boost multiplier for different lock durations"
"How much voting power do I need for maximum gauge rewards?"
"What's the optimal lock duration for my AERO tokens?"
```

## Quick Start

1. Clone this repository
2. Install dependencies:
```bash
pnpm install
```

3. Configure environment variables:
```bash
# Create a .env file with the following variables
GRAPH_API_KEY='your-graph-api-key'
ACCOUNT_ID='your-account-id'
PLUGIN_URL='your-plugin-url'
```

4. Start the development server:
```bash
pnpm run dev
```

## Usage Examples

### Get Pool Analytics
```bash
curl "http://localhost:3000/api/tools/aerodrome/pool-analytics?poolAddress=0x..."
```

### View Gauge Analysis
```bash
curl "http://localhost:3000/api/tools/aerodrome/gauge-analysis?gaugeAddress=0x..."
```

### Check Portfolio
```bash
curl "http://localhost:3000/api/tools/aerodrome/portfolio-tracking?address=0x..."
```

### Get Yield Optimization
```bash
curl "http://localhost:3000/api/tools/aerodrome/yield-optimization?riskTolerance=medium"
```

## Development

### Building the Project
```bash
pnpm run build
```

### Running Tests
```bash
pnpm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
