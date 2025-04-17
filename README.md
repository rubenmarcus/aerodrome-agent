# Aerodrome Finance AI Agent

A powerful AI assistant specialized in providing detailed information and analytics about the Aerodrome Protocol on Base network. This assistant helps users understand and interact with the Aerodrome ecosystem through various tools and endpoints.

## Features

### Analytics Tools
- 🔍 Pool Analytics: Get detailed information about any Aerodrome pool
- 📊 Gauge Analysis: View and analyze gauge performance and rewards
- 💼 Portfolio Tracking: Monitor LP positions and rewards
- 📈 Yield Optimization: Get optimal farming strategies based on risk tolerance
- 🏗️ Position Management: Help users enter/exit positions with minimal slippage
- 💸 Bribe Strategy: Analyze bribe ROI and recommend efficient bribing approaches
- 🛣️ Multi-pool Routing: Find optimal swap paths across different liquidity pools
- 🗳️ Voting Power: Track veAERO voting power and boost multipliers
- 📊 Fee Collection: Monitor and analyze fee collection from pools
- 📈 Pool Creation: Get recommendations for creating new pools
- 📊 Bribe Market: Analyze bribe market dynamics and opportunities
- 📈 Gauge Info: Get detailed information about specific gauges
- 📊 Pools List: Browse and filter available pools

### Transaction Tools
- 🔄 Add Liquidity: Generate transactions for adding liquidity to pools
- 🔄 Remove Liquidity: Generate transactions for removing liquidity
- 🔄 Claim Rewards: Generate transactions for claiming gauge rewards
- 🔄 Vote: Generate transactions for voting on gauge weights
- 🔄 Split Lock: Generate transactions for splitting veAERO locks
- 🔄 Merge Locks: Generate transactions for merging veAERO locks

### Utility Tools
- ℹ️ Token Info: Get detailed information about any token
- 📊 Pool Summary: Get a comprehensive summary of pool metrics
- 📈 Optimal Routing: Find the best swap routes between tokens

### ve-Token Tools
- 📊 Rewards Calculator: Calculate potential rewards from veAERO positions
- 📈 Voting Power: Track and analyze veAERO voting power

### Tutorial Tools
- 📚 Main Tutorial: Step-by-step guide to using Aerodrome
- ❌ Common Mistakes: Learn about common pitfalls and how to avoid them
- 📖 Explain Concept: Get detailed explanations of Aerodrome concepts

## Available Tools

### Analytics Tools

#### 1. Pool Analytics
- Endpoint: `/api/tools/aerodrome/analytics/pool-analytics`
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
"Calculate the current TVL and trading volume for the USDC/ETH pool"
"Show me the fee structure and APR breakdown for the AERO/ETH pool"
"What's the current liquidity depth and price impact for the USDC/USDT pool?"
"Compare the historical performance of different stablecoin pools"
"Analyze the impermanent loss risk for volatile pairs vs stable pairs"
```

#### 2. Gauge Analysis
- Endpoint: `/api/tools/aerodrome/analytics/gauge-analysis`
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
"Show me the current emissions distribution across all gauges"
"Calculate the boost multiplier for different voting power levels"
"What's the optimal voting strategy for a medium-sized position?"
"Compare the historical emissions rates between different gauges"
"Analyze the impact of voting power on rewards for different pool sizes"
```

#### 3. Fee Collection
- Endpoint: `/api/tools/aerodrome/analytics/fee-collection`
- Features:
  - Pool fee collection data
  - Historical fee trends
  - Fee distribution analysis

Example prompts:
```
"Show me the fee collection data for the USDC/ETH pool"
"What's the historical fee trend for the AERO/ETH pool?"
"Compare fee collection between different pools"
"Analyze the fee distribution for the last 7 days"
"Calculate the total fees collected in the last month"
```

#### 4. Pool Creation
- Endpoint: `/api/tools/aerodrome/analytics/pool-creation`
- Features:
  - Token pair analysis
  - Initial liquidity recommendations
  - Fee tier suggestions
  - Risk assessment

Example prompts:
```
"Analyze the potential for a new USDC/ETH pool"
"What's the recommended initial liquidity for a new pool?"
"Suggest the optimal fee tier for a new stablecoin pool"
"Calculate the risk factors for creating a new pool"
"Compare different token pairs for pool creation"
```

#### 5. Bribe Market
- Endpoint: `/api/tools/aerodrome/analytics/bribe-market`
- Features:
  - Current bribe market status
  - Bribe distribution analysis
  - Market trends
  - Opportunity identification

Example prompts:
```
"Show me the current bribe market status"
"Analyze the bribe distribution across gauges"
"What are the current bribe market trends?"
"Identify the most profitable bribe opportunities"
"Compare bribe returns between different gauges"
```

### Transaction Tools

#### 1. Add Liquidity
- Endpoint: `/api/tools/aerodrome/txn/add-liquidity`
- Features:
  - Generate add liquidity transactions
  - Optimize token amounts
  - Calculate minimum amounts
  - Set deadlines

Example prompts:
```
"Generate a transaction to add liquidity to the USDC/ETH pool"
"Calculate the optimal amounts for adding $1000 to the AERO/ETH pool"
"What's the minimum amount I should add to avoid high slippage?"
"Help me add liquidity with minimal price impact"
"Generate a transaction for adding equal value amounts"
```

#### 2. Remove Liquidity
- Endpoint: `/api/tools/aerodrome/txn/remove-liquidity`
- Features:
  - Generate remove liquidity transactions
  - Calculate expected amounts
  - Optimize removal timing
  - Set minimum amounts

Example prompts:
```
"Generate a transaction to remove liquidity from the USDC/ETH pool"
"Calculate the expected amounts when removing my position"
"What's the best time to remove liquidity to minimize impact?"
"Help me remove liquidity with minimal slippage"
"Generate a transaction for partial liquidity removal"
```

#### 3. Claim Rewards
- Endpoint: `/api/tools/aerodrome/txn/claim-rewards`
- Features:
  - Generate claim rewards transactions
  - Optimize claiming frequency
  - Calculate gas costs
  - Batch claims

Example prompts:
```
"Generate a transaction to claim my gauge rewards"
"What's the optimal frequency for claiming rewards?"
"Calculate the gas cost for claiming rewards"
"Help me batch multiple reward claims"
"Generate a transaction for claiming all pending rewards"
```

#### 4. Vote
- Endpoint: `/api/tools/aerodrome/txn/vote`
- Features:
  - Generate vote transactions
  - Optimize voting power
  - Calculate vote impact
  - Set voting weights

Example prompts:
```
"Generate a transaction to vote for the USDC/ETH gauge"
"Calculate the optimal voting weight for maximum impact"
"What's the best voting strategy for my veAERO balance?"
"Help me distribute my votes across multiple gauges"
"Generate a transaction for changing my vote weights"
```

### Utility Tools

#### 1. Token Info
- Endpoint: `/api/tools/aerodrome/utils/token-info`
- Features:
  - Token details
  - Contract information
  - Price data
  - Market metrics

Example prompts:
```
"Get information about the AERO token"
"Show me the contract details for USDC"
"What's the current price and market data for ETH?"
"Compare different token metrics"
"Analyze the token's performance over time"
```

#### 2. Pool Summary
- Endpoint: `/api/tools/aerodrome/utils/pool-summary`
- Features:
  - Pool overview
  - Key metrics
  - Performance data
  - Risk assessment

Example prompts:
```
"Get a summary of the USDC/ETH pool"
"Show me the key metrics for the AERO/ETH pool"
"What's the performance data for the last month?"
"Compare different pool metrics"
"Analyze the pool's risk factors"
```

### ve-Token Tools

#### 1. Rewards Calculator
- Endpoint: `/api/tools/aerodrome/ve-token/rewards-calculator`
- Features:
  - Potential rewards calculation
  - Lock duration impact
  - Boost multiplier analysis
  - ROI projections

Example prompts:
```
"Calculate my potential rewards from veAERO"
"What's the impact of different lock durations on rewards?"
"Show me the boost multiplier for my position"
"Project my ROI for different scenarios"
"Compare rewards between different lock strategies"
```

### Tutorial Tools

#### 1. Main Tutorial
- Endpoint: `/api/tools/aerodrome/tutorial/main-tutorial`
- Features:
  - Step-by-step guides
  - Protocol overview
  - Feature explanations
  - Best practices

Example prompts:
```
"Show me the main tutorial for Aerodrome"
"What are the key features I should know about?"
"Guide me through the liquidity provision process"
"Explain how to participate in governance"
"Show me the best practices for yield farming"
```

#### 2. Common Mistakes
- Endpoint: `/api/tools/aerodrome/tutorial/common-mistakes`
- Features:
  - Error prevention
  - Risk mitigation
  - Best practices
  - Solution recommendations

Example prompts:
```
"What are common mistakes in liquidity provision?"
"Show me how to avoid impermanent loss"
"What should I watch out for when staking?"
"Explain common governance mistakes"
"Help me avoid common bribe strategy errors"
```

#### 3. Explain Concept
- Endpoint: `/api/tools/aerodrome/tutorial/explain-concept`
- Features:
  - Concept explanations
  - Examples
  - Key points
  - Related concepts

Example prompts:
```
"Explain how liquidity pools work"
"What is impermanent loss?"
"Describe the veAERO token system"
"Explain how bribes work in Aerodrome"
"Describe the gauge voting system"
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
curl "http://localhost:3000/api/tools/aerodrome/analytics/pool-analytics?poolAddress=0x..."
```

### View Gauge Analysis
```bash
curl "http://localhost:3000/api/tools/aerodrome/analytics/gauge-analysis?gaugeAddress=0x..."
```

### Check Portfolio
```bash
curl "http://localhost:3000/api/tools/aerodrome/analytics/portfolio-tracking?address=0x..."
```

### Get Yield Optimization
```bash
curl "http://localhost:3000/api/tools/aerodrome/analytics/yield-optimization?riskTolerance=medium"
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
