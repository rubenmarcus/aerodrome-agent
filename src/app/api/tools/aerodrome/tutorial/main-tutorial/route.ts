import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const step = searchParams.get('step') || '1';

    const tutorials = {
      '1': {
        title: 'Welcome to Aerodrome Agent',
        content: 'I am your AI assistant for Aerodrome Finance. I can help you with:',
        sections: [
          'Understanding Aerodrome concepts',
          'Managing your liquidity positions',
          'Optimizing your yield',
          'Participating in governance',
          'Creating and managing bribes',
        ],
        nextStep: '2',
      },
      '2': {
        title: 'Liquidity Management',
        content: "Here's what you can do with liquidity:",
        sections: [
          'Add liquidity to pools',
          'Remove liquidity when needed',
          'Monitor your position health',
          'Calculate optimal liquidity amounts',
          'Understand impermanent loss risks',
        ],
        nextStep: '3',
      },
      '3': {
        title: 'Yield Optimization',
        content: 'Maximize your returns by:',
        sections: [
          'Staking LP tokens in gauges',
          'Understanding bribe strategies',
          'Optimizing lock durations',
          'Tracking your portfolio performance',
          'Finding the best yield opportunities',
        ],
        nextStep: '4',
      },
      '4': {
        title: 'Governance Participation',
        content: 'Participate in protocol governance:',
        sections: [
          'Lock AERO tokens for voting power',
          'Vote on gauge weights',
          'Create and manage bribes',
          'Track voting power distribution',
          'Understand governance incentives',
        ],
        nextStep: '5',
      },
      '5': {
        title: 'Getting Help',
        content: 'Need assistance? You can:',
        sections: [
          'Ask about any Aerodrome concept',
          'Get explanations of common mistakes',
          'Request step-by-step guides',
          'Get personalized recommendations',
          'Learn about best practices',
        ],
        nextStep: '1',
      },
    };

    return NextResponse.json({
      currentStep: step,
      tutorial: tutorials[step as keyof typeof tutorials],
      availableSteps: Object.keys(tutorials),
    });
  } catch (error) {
    console.error('Error getting tutorial:', error);
    return NextResponse.json({ error: 'Failed to get tutorial' }, { status: 500 });
  }
}
