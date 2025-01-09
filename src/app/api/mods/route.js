import { connectToDatabase } from '@/lib/mongodb/client';
import { Mod } from '@/lib/mongodb/models/mods';

export async function GET(request) {
  try {
    await connectToDatabase();

    // Get search parameters
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const tags = searchParams.get('tags')?.split(',');
    const maxPrice = searchParams.get('maxPrice');
    const verified = searchParams.get('verified');

    // Build query
    const query = {};
    if (type) query.type = type;
    if (tags?.length > 0) query.tags = { $in: tags };
    if (maxPrice) query.price = { $lte: parseFloat(maxPrice) };
    if (verified) query.verified = verified === 'true';

    const mods = await Mod.find(query).sort({ createdAt: -1 });

    return Response.json({ success: true, data: mods });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();

    const mod = await Mod.create(data);

    return Response.json({ success: true, data: mod }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);

    if (error.name === 'ValidationError') {
      return Response.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return Response.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json(
        { success: false, error: 'ID parameter is required' },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Find and update the mod, returning the new version
    const mod = await Mod.findByIdAndUpdate(
      id,
      {
        ...data,
        updatedAt: new Date(),
      },
      {
        new: true, // Return updated document
        runValidators: true, // Run schema validators
      }
    );

    if (!mod) {
      return Response.json(
        { success: false, error: 'Mod not found' },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: mod });
  } catch (error) {
    console.error('Database error:', error);

    if (error.name === 'ValidationError') {
      return Response.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return Response.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json(
        { success: false, error: 'ID parameter is required' },
        { status: 400 }
      );
    }

    const mod = await Mod.findByIdAndDelete(id);

    if (!mod) {
      return Response.json(
        { success: false, error: 'Mod not found' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: 'Mod deleted successfully',
    });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
