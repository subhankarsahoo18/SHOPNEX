import User from "../models/user.js";
import Address from "../models/Address.js";
import Order from "../models/Order.js";

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).populate('wishlist').select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });

        const address = await Address.findOne({ userId });

        res.json({ user, address });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, phone, adressLine, city, state, pincode } = req.body;

        const user = await User.findByIdAndUpdate(userId, { name, phone }, { new: true }).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });

        let address = await Address.findOne({ userId });
        if (address) {
            address.adressLine = adressLine;
            address.city = city;
            address.state = state;
            address.pincode = pincode;
            await address.save();
        } else {
            address = await Address.create({
                userId,
                fullName: name,
                phone,
                adressLine,
                city,
                state,
                pincode
            });
        }

        res.json({ message: "Profile updated successfully", user, address });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const toggleWishlist = async (req, res) => {
    try {
        const userId = req.params.id;
        const { productId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const index = user.wishlist.findIndex(id => id.toString() === productId.toString());
        if (index === -1) {
            user.wishlist.push(productId);
        } else {
            user.wishlist.splice(index, 1);
        }

        await user.save();
        await user.populate('wishlist');

        res.json({ message: "Wishlist updated", wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.params.id;
        const orders = await Order.find({ userId }).populate('items.productId').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
