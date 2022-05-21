import { schemaComposer } from "graphql-compose"
import { SheetModel, SheetTC } from "../../models/sheet"
import { FavoriteModel } from "../../models/favorite"

export const createSheet = SheetTC.getResolver("createOne")
export const deleteSheet = schemaComposer.createResolver({
  name: "deleteSheet",
  type: SheetTC,
  args: {
    sheetId: "MongoID!",
  },
  resolve: async ({ context, args }) => {
    const { sheetId } = args
    const sheet = await SheetModel.findById(sheetId)
    if (!sheet) {
      return null
    }
    await sheet.remove()
    await FavoriteModel.deleteMany({ sheetId: sheetId })

    return sheet
  },
})
