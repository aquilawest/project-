import { Iuser } from "../types/interfaces/user.inter";
import User from "../models/user.model";

export default class ProfileService {
  static async getProfile(userId: string): Promise<Partial<Iuser> | null> {
    const userProfile = await User.findById(userId);

    if (!userProfile) {
      return null;
    }
    return userProfile;
  }

  static async uploadImage(
    userId: string,
    payload: Iuser
  ): Promise<Iuser | null> {
    const { image } = payload;

    const profile = await User.findByIdAndUpdate(
      userId,
      { image },
      { new: true }
    ).select("+email");
    return profile;
  }


  static async getUsersByReferralCode(referralCode: string): Promise<Iuser[]> {
    return User.find({ 'referral.referredBy': referralCode });
  }

  static async updateUserProfile(
    id: string,
    data: Iuser
  ): Promise<Iuser | null> {
    const profile = await User.findByIdAndUpdate(id, data, { new: true }).select(
      "+email"
    );
    return profile;
  }

  static async deleteMember(id: string): Promise<Iuser | null> {
    const deleteMember = await User.findByIdAndDelete(id, { new: true });
    return deleteMember;
  }
}
