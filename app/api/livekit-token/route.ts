import { NextRequest, NextResponse } from 'next/server'
import { AccessToken } from 'livekit-server-sdk'

export async function POST(request: NextRequest) {
  try {
    const { roomName, participantName } = await request.json()

    if (!roomName || !participantName) {
      return NextResponse.json(
        { error: 'Room name and participant name are required' },
        { status: 400 }
      )
    }

    // Get LiveKit credentials from environment
    const apiKey = process.env.NEXT_PUBLIC_LIVEKIT_API_KEY || 'APIxCnKpwpoRrQH'
    const apiSecret = process.env.LIVEKIT_API_SECRET || 'r7Gn9w3a9IQk5HURgPFC2BjIgtfZN78LOSrEU38bspE'
    const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || 'wss://sanjeevan-23bj7opl.livekit.cloud'

    // Create access token
    const at = new AccessToken(apiKey, apiSecret, {
      identity: participantName,
      ttl: '10m', // Token valid for 10 minutes
    })

    // Grant permissions
    at.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canPublishData: true,
      canSubscribe: true,
    })

    const token = await at.toJwt()

    return NextResponse.json({
      token,
      url: wsUrl,
    })
  } catch (error) {
    console.error('Error generating LiveKit token:', error)
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    )
  }
}
