ESX = exports['es_extended']:getSharedObject()

local inZone = false

local function openShop()
    local inventory = exports.ox_inventory:GetInventoryItems() or {}
    local previewItems = {}

    for _, item in pairs(inventory) do
        if item.name then
            table.insert(previewItems, {
                name = item.name,
                label = item.label or item.name,
                count = item.count or 1,
                icon = item.icon or '📦'
            })
        end
    end

    local shopItems = {}

    for _, item in ipairs(Config.Items) do
        table.insert(shopItems, {
            label = item.label,
            name = item.item,
            price = item.price,
            icon = item.icon
        })
    end

    SendNUIMessage({
        action = 'openShop',
        playerName = GetPlayerName(PlayerId()),
        money = '$' .. math.floor((ESX.GetPlayerData().money or 0) * 1),
        inventoryUsage = '1.8kg / 5kg',
        usagePercent = 38,
        inventory = previewItems,
        shopItems = shopItems
    })

    SetNuiFocus(true, true)
end

local function closeShop()
    SendNUIMessage({ action = 'closeShop' })
    SetNuiFocus(false, false)
end

RegisterNUICallback('buyItem', function(data, cb)
    if not data or not data.item then
        cb('ok')
        return
    end

    TriggerServerEvent('esx_grocery_ref:buyItem', data.item)
    closeShop()
    cb('ok')
end)

RegisterNUICallback('closeMenu', function(_, cb)
    closeShop()
    cb('ok')
end)

CreateThread(function()
    while true do
        local playerCoords = GetEntityCoords(PlayerPedId())
        local dist = #(playerCoords - Config.Shop.coords)

        if dist < Config.Shop.radius then
            if not inZone then
                inZone = true
                ESX.ShowHelpNotification('Press ~INPUT_CONTEXT~ to open the grocery store')
            end

            if IsControlJustReleased(0, 38) then
                openShop()
            end
        else
            if inZone then
                inZone = false
            end
        end

        Wait(250)
    end
end)
