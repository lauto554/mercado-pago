import apiMercado from "../lib/apiMercado";

export class MercadoPagoService {
  static async getUserData(accessToken: string): Promise<any> {
    try {
      const response = await apiMercado.get("/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error("Error en getUserData: " + error);
    }
  }
}
