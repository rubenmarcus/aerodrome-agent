import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const mistakes = {
      liquidity: {
        title: 'Common Liquidity Mistakes',
        mistakes: [
          {
            mistake: 'Adding imbalanced liquidity',
            explanation:
              'Adding tokens in unequal value ratios can lead to immediate impermanent loss.',
            solution: 'Always add tokens in equal value amounts based on current prices.',
          },
          {
            mistake: 'Ignoring pool fees',
            explanation: 'Different pools have different fee structures (0.01%, 0.05%, 0.3%, 1%).',
            solution:
              'Choose the appropriate fee tier based on token volatility and expected trading volume.',
          },
          {
            mistake: 'Not monitoring position health',
            explanation: 'Failing to track your position can lead to unexpected losses.',
            solution: 'Regularly check your position health and impermanent loss metrics.',
          },
        ],
      },
      staking: {
        title: 'Common Staking Mistakes',
        mistakes: [
          {
            mistake: 'Not claiming rewards regularly',
            explanation:
              "Unclaimed rewards don't compound and may be vulnerable to smart contract risks.",
            solution: 'Set up regular reward claims or use auto-compounding strategies.',
          },
          {
            mistake: 'Ignoring gauge weights',
            explanation: 'Staking in low-weight gauges can result in minimal rewards.',
            solution: 'Monitor gauge weights and voting power distribution before staking.',
          },
          {
            mistake: 'Forgetting about lock periods',
            explanation: 'Some staking options have lock periods that restrict withdrawals.',
            solution: 'Always check lock periods and plan your liquidity needs accordingly.',
          },
        ],
      },
      governance: {
        title: 'Common Governance Mistakes',
        mistakes: [
          {
            mistake: 'Not maximizing lock duration',
            explanation: 'Shorter locks result in less voting power and lower reward boosts.',
            solution:
              "Consider longer lock periods for maximum benefits if you're committed to the protocol.",
          },
          {
            mistake: 'Voting without research',
            explanation: 'Voting blindly can lead to poor gauge weight distribution.',
            solution: 'Research pools and their performance before voting.',
          },
          {
            mistake: 'Ignoring bribe opportunities',
            explanation: 'Missing out on potential additional earnings from bribes.',
            solution: 'Regularly check bribe markets and consider them in your voting strategy.',
          },
        ],
      },
      bribes: {
        title: 'Common Bribe Mistakes',
        mistakes: [
          {
            mistake: 'Creating bribes too early',
            explanation: 'Early bribes might not attract enough votes.',
            solution: 'Time your bribes closer to the voting period for better efficiency.',
          },
          {
            mistake: 'Not considering bribe ROI',
            explanation: 'Creating bribes without calculating potential returns.',
            solution: 'Calculate expected returns based on voting power and gauge weights.',
          },
          {
            mistake: 'Ignoring bribe duration',
            explanation: 'Too short or too long bribe durations can be inefficient.',
            solution: 'Match bribe duration with voting periods and your goals.',
          },
        ],
      },
    };

    if (!category || !(category in mistakes)) {
      return NextResponse.json(
        {
          error: 'Category not found',
          availableCategories: Object.keys(mistakes),
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      category,
      mistakes: mistakes[category as keyof typeof mistakes],
    });
  } catch (error) {
    console.error('Error getting common mistakes:', error);
    return NextResponse.json({ error: 'Failed to get common mistakes' }, { status: 500 });
  }
}
