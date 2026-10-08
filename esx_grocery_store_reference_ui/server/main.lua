ESX = exports['es_extended']:getSharedObject()

RegisterServerEvent('esx_grocery_ref:buyItem', function(itemName)
    local src = source
    local xPlayer = ESX.GetPlayerFromId(src)

    if not xPlayer then return end

    local item = nil

    for _, v in ipairs(Config.Items) do
        if v.item == itemName then
            item = v
            break
        end
    end

    if not item then
        TriggerClientEvent('esx:showNotification', src, 'Item not found.')
        return
    end

    if xPlayer.getMoney() < item.price then
        TriggerClientEvent('esx:showNotification', src, 'Not enough money.')
        return
    end

    xPlayer.removeMoney(item.price)

    local success = exports.ox_inventory:AddItem(src, item.item, 1)
    if success then
        TriggerClientEvent('esx:showNotification', src, 'Bought ' .. item.label .. ' for $' .. item.price)
    else
        xPlayer.addMoney(item.price)
        TriggerClientEvent('esx:showNotification', src, 'Inventory full.')
    end
end)
