import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const concept = searchParams.get('concept');

    const concepts = {
      'liquidity-pool': {
        title: 'Liquidity Pool',
        explanation: 'A liquidity pool is like a shared pot of tokens that enables trading. When you add your tokens to a pool, you become a liquidity provider and earn fees from trades.',
        keyPoints: [
          'You provide two tokens in equal value',
          'You receive LP (Liquidity Provider) tokens in return',
          'You earn trading fees proportional to your share',
          'Your tokens are used for others to trade against'
        ],
        example: 'If you add ETH and USDC to a pool, traders can swap between these tokens using your liquidity.'
      },
      'gauge': {
        title: 'Gauge',
        explanation: 'A gauge is where you stake your LP tokens to earn additional AERO rewards. Think of it as a rewards multiplier for your liquidity.',
        keyPoints: [
          'You stake your LP tokens in a gauge',
          'You earn AERO tokens as additional rewards',
          'Rewards depend on gauge weight (voting)',
          'You can withdraw your LP tokens anytime'
        ],
        example: 'Staking your ETH-USDC LP tokens in a gauge might earn you 20% APR in AERO tokens on top of trading fees.'
      },
      've-token': {
        title: 'veAERO Token',
        explanation: 'veAERO (vote-escrowed AERO) is created by locking AERO tokens. It gives you voting power and boosts your rewards.',
        keyPoints: [
          'Lock AERO tokens to get veAERO',
          'Longer locks = more voting power',
          'Boosts your gauge rewards',
          'Cannot be transferred or sold'
        ],
        example: 'Locking 1000 AERO for 4 years gives you maximum voting power and reward boosts.'
      },
      'bribe': {
        title: 'Bribe',
        explanation: 'A bribe is an incentive paid to veAERO holders to vote for a specific gauge. It\'s a way to earn additional rewards.',
        keyPoints: [
          'Anyone can create bribes',
          'Paid in any ERC20 token',
          'Distributed to voters',
          'Duration can be customized'
        ],
        example: 'A protocol might bribe voters with their token to get more AERO emissions directed to their pool.'
      },
      'impermanent-loss': {
        title: 'Impermanent Loss',
        explanation: 'Impermanent loss happens when the price ratio of your tokens changes compared to when you added them to the pool.',
        keyPoints: [
          'Occurs due to price changes',
          'More significant with volatile pairs',
          'Can be offset by trading fees',
          'Only realized when you withdraw'
        ],
        example: 'If ETH price doubles after you add liquidity, you\'ll have less ETH but more of the other token when you withdraw.'
      }
    };

    if (!concept || !(concept in concepts)) {
      return NextResponse.json(
        {
          error: 'Concept not found',
          availableConcepts: Object.keys(concepts)
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      concept,
      explanation: concepts[concept as keyof typeof concepts]
    });
  } catch (error) {
    console.error('Error explaining concept:', error);
    return NextResponse.json(
      { error: 'Failed to explain concept' },
      { status: 500 }
    );
  }
}